-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-09-2022 a las 20:37:42
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rrhh`
--
CREATE DATABASE IF NOT EXISTS `rrhh` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rrhh`;

DELIMITER $$
--
-- Funciones
--
CREATE DEFINER=`` FUNCTION `calcularEdad` (`ci` VARCHAR(11)) RETURNS INT(11) BEGIN
    DECLARE yearCI INT ; DECLARE month INT; DECLARE day INT;
    DECLARE yearNac INT;    
    DECLARE edad INT;
    
    SET yearCI = CAST(SUBSTRING(ci, 1, 2) AS INT) ;
    
    IF CAST(SUBSTRING(ci, 7, 1) AS INTEGER) < 6 
    THEN SET yearNac = yearCI + 1900;
    ELSE SET yearNac = yearCI  + 2000;
    END IF;
    
    SET month = CAST(SUBSTRING(ci, 3, 2) AS INT) ;
    SET day = CAST(SUBSTRING(ci, 5, 2) AS INT) ;

    SET edad = YEAR(NOW()) - yearNac;
    
    IF month > MONTH(NOW())
    THEN SET edad = edad - 1;
        ELSEIF MONTH = MONTH(NOW()) AND DAY > DAY(NOW())
        THEN SET edad = edad - 1;
    END IF;
    RETURN edad ; 
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ausencias`
--

CREATE TABLE `ausencias` (
  `id` int(11) NOT NULL,
  `id_cat_ocup` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `autorizado` int(11) NOT NULL DEFAULT 0,
  `enfermedad` int(11) NOT NULL DEFAULT 0,
  `iss` int(11) NOT NULL DEFAULT 0,
  `accidentes` int(11) NOT NULL DEFAULT 0,
  `injustificado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `nocturnidad` double DEFAULT NULL,
  `id_escala` int(10) NOT NULL,
  `id_cat_ocup` int(10) NOT NULL,
  `id_escolar_min` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_docente`
--

CREATE TABLE `categoria_docente` (
  `id` int(10) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `salario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_docente`
--

INSERT INTO `categoria_docente` (`id`, `tipo`, `salario`) VALUES
(1, 'Instructor', 220),
(2, 'Asistente', 330),
(3, 'Auxiliar', 440);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_ocupacional`
--

CREATE TABLE `categoria_ocupacional` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `abreviado` varchar(10) NOT NULL,
  `parent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_ocupacional`
--

INSERT INTO `categoria_ocupacional` (`id`, `nombre`, `abreviado`, `parent`) VALUES
(1, 'Cuadro', 'C', NULL),
(2, 'Técnico', 'T', NULL),
(3, 'Servicios', 'S', NULL),
(5, 'Operario', 'O', NULL),
(7, 'Administrativo', 'A', NULL),
(8, 'Médico', 'T', 2),
(9, 'Enfermero', 'T', 2),
(10, 'Estomatólogo', 'T', 2),
(11, 'Auxiliar de limpieza', 'S', 3),
(12, 'Atención a pacientes', 'S', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cla`
--

CREATE TABLE `cla` (
  `id` int(10) NOT NULL,
  `grupo` varchar(255) NOT NULL,
  `salario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cla`
--

INSERT INTO `cla` (`id`, `grupo`, `salario`) VALUES
(1, '1', 1),
(3, '3', 3),
(4, '2', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_unidad` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento_cargo`
--

CREATE TABLE `departamento_cargo` (
  `Departamentoid` int(10) NOT NULL,
  `Cargoid` int(10) NOT NULL,
  `plazas` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escala`
--

CREATE TABLE `escala` (
  `id` int(10) NOT NULL,
  `clasificador` varchar(10) NOT NULL,
  `salario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `escala`
--

INSERT INTO `escala` (`id`, `clasificador`, `salario`) VALUES
(1, 'XXIV', 6310),
(3, 'XVI', 4410),
(4, 'I', 2150),
(5, 'II', 2200),
(6, 'III', 2310),
(7, 'VI', 2710),
(8, 'V', 2540),
(10, 'IV', 2420),
(11, 'VII', 2810),
(12, 'VIII', 2960),
(13, 'IX', 3110),
(14, 'X', 3260),
(15, 'XI', 3410),
(16, 'XII', 3610),
(17, 'XIII', 3810),
(18, 'XIV', 4010),
(19, 'XV', 4210),
(21, 'XVII', 4610),
(23, 'XVIII', 4810),
(24, 'XIX', 5060),
(25, 'XX', 5410),
(26, 'XXI', 5560),
(27, 'XXII', 5810),
(28, 'XXIII', 6060);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `levantamiento`
--

CREATE TABLE `levantamiento` (
  `id` int(11) NOT NULL,
  `id_cat_ocup` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `madres` int(11) NOT NULL DEFAULT 0,
  `aislamiento` int(11) NOT NULL DEFAULT 0,
  `covid` int(11) NOT NULL DEFAULT 0,
  `no_covid` int(11) NOT NULL DEFAULT 0,
  `peritados` int(11) NOT NULL DEFAULT 0,
  `embarazo` int(11) NOT NULL DEFAULT 0,
  `lic_mat` int(11) NOT NULL DEFAULT 0,
  `otra_lic` int(11) NOT NULL DEFAULT 0,
  `vacaciones` int(11) NOT NULL DEFAULT 0,
  `interruptos` int(11) NOT NULL DEFAULT 0,
  `teletrabajo` int(11) NOT NULL DEFAULT 0,
  `pesquisa` int(11) NOT NULL DEFAULT 0,
  `vacunacion` int(11) NOT NULL DEFAULT 0,
  `otro_puesto` int(11) NOT NULL DEFAULT 0,
  `total_mujeres_no_fisico` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_escolar`
--

CREATE TABLE `nivel_escolar` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `relevancia` int(10) NOT NULL,
  `abreviado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nivel_escolar`
--

INSERT INTO `nivel_escolar` (`id`, `nombre`, `relevancia`, `abreviado`) VALUES
(1, 'Superior', 1000, 'SUP'),
(2, 'Medio Superior', 800, 'M/SUP'),
(3, 'Tecnico Medio', 500, 'T/M'),
(5, 'Habilitado (Primaria no terminada)', 99, 'HAB'),
(6, 'Medio', 200, 'MED'),
(7, 'Tecnico Medio Superior', 900, 'T/M/SUP'),
(9, 'Habilitado (Primaria terminada)', 100, 'HAB'),
(10, 'Habilitado (Obrero)', 105, 'HAB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nocturnidades`
--

CREATE TABLE `nocturnidades` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `id_trabajador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`, `descripcion`) VALUES
(1, 'ADMIN', 'Administrador'),
(2, 'JDEP', 'Jefe de departamento'),
(3, 'USER', 'Usuario autorizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `ci` varchar(11) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `maestria` tinyint(1) NOT NULL,
  `doctorado` tinyint(1) NOT NULL,
  `mision` tinyint(1) NOT NULL,
  `id_departamento` int(10) NOT NULL,
  `id_cargo` int(10) NOT NULL,
  `id_cat_doc` int(10) DEFAULT NULL,
  `id_CLA` int(10) DEFAULT NULL,
  `id_escolar` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad`
--

CREATE TABLE `unidad` (
  `id` int(10) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `PASSWORD`, `nombre`, `apellidos`, `email`, `telefono`, `enabled`) VALUES
(1, 'danny98cuba', '$2a$10$za1ANVpW/ul6HIg3WD6XEeJr7Ad6Ka8R7bqUzOrXvOZ5Feedih3fy', 'Daniel', 'González Cuétara', 'danny.glezcuet98@gmail.com', '53741292', 1),
(2, 'user', '$2a$10$EEFiTj1iiiISSbS8FHPB/eYsGcuiszSMBtN4X6BlA0Q5BkDn6VB1K', 'Usuario', 'Autorizado', 'd4nny.m3nd3z@gmail.com', NULL, 1),
(3, 'jdep', '$2a$10$oybDsJ.4chEaX6cFlweJMeeE1eBOOqipXPVAxZa2ug9zj32hU/MGi', 'Jefe', 'Departamento', 'danny97cuba@gmail.com', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_roles`
--

CREATE TABLE `usuario_roles` (
  `id_usuario` int(10) NOT NULL,
  `id_rol` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_roles`
--

INSERT INTO `usuario_roles` (`id_usuario`, `id_rol`) VALUES
(1, 1),
(2, 3),
(3, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ausencias`
--
ALTER TABLE `ausencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CatOcup_Ausencia` (`id_cat_ocup`) USING BTREE;

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `FKCargo60784` (`id_escala`),
  ADD KEY `FKCargo195211` (`id_cat_ocup`),
  ADD KEY `FKCargo753442` (`id_escolar_min`);

--
-- Indices de la tabla `categoria_docente`
--
ALTER TABLE `categoria_docente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Indices de la tabla `categoria_ocupacional`
--
ALTER TABLE `categoria_ocupacional`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `FKCategoria_605219` (`parent`);

--
-- Indices de la tabla `cla`
--
ALTER TABLE `cla`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grupo` (`grupo`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKDepartamen508759` (`id_unidad`);

--
-- Indices de la tabla `departamento_cargo`
--
ALTER TABLE `departamento_cargo`
  ADD PRIMARY KEY (`Departamentoid`,`Cargoid`),
  ADD KEY `FKDepartamen712274` (`Departamentoid`),
  ADD KEY `FKDepartamen995951` (`Cargoid`);

--
-- Indices de la tabla `escala`
--
ALTER TABLE `escala`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clasificador` (`clasificador`);

--
-- Indices de la tabla `levantamiento`
--
ALTER TABLE `levantamiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CatOcup_Levant` (`id_cat_ocup`) USING BTREE;

--
-- Indices de la tabla `nivel_escolar`
--
ALTER TABLE `nivel_escolar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `nocturnidades`
--
ALTER TABLE `nocturnidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Trabajador_Nocturnidad` (`id_trabajador`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `FKTrabajador580932` (`id_departamento`),
  ADD KEY `FKTrabajador822340` (`id_cargo`),
  ADD KEY `FKTrabajador156627` (`id_cat_doc`),
  ADD KEY `FKTrabajador605488` (`id_CLA`),
  ADD KEY `FKTrabajador57962` (`id_escolar`);

--
-- Indices de la tabla `unidad`
--
ALTER TABLE `unidad`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD PRIMARY KEY (`id_usuario`,`id_rol`),
  ADD KEY `FKUsuario_ro869944` (`id_usuario`),
  ADD KEY `FKUsuario_ro20423` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ausencias`
--
ALTER TABLE `ausencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria_docente`
--
ALTER TABLE `categoria_docente`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `categoria_ocupacional`
--
ALTER TABLE `categoria_ocupacional`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `cla`
--
ALTER TABLE `cla`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `escala`
--
ALTER TABLE `escala`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `levantamiento`
--
ALTER TABLE `levantamiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nivel_escolar`
--
ALTER TABLE `nivel_escolar`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `nocturnidades`
--
ALTER TABLE `nocturnidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidad`
--
ALTER TABLE `unidad`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ausencias`
--
ALTER TABLE `ausencias`
  ADD CONSTRAINT `CatOcup_Ausencia` FOREIGN KEY (`id_cat_ocup`) REFERENCES `categoria_ocupacional` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD CONSTRAINT `FKCargo195211` FOREIGN KEY (`id_cat_ocup`) REFERENCES `categoria_ocupacional` (`id`),
  ADD CONSTRAINT `FKCargo60784` FOREIGN KEY (`id_escala`) REFERENCES `escala` (`id`),
  ADD CONSTRAINT `FKCargo753442` FOREIGN KEY (`id_escolar_min`) REFERENCES `nivel_escolar` (`id`);

--
-- Filtros para la tabla `categoria_ocupacional`
--
ALTER TABLE `categoria_ocupacional`
  ADD CONSTRAINT `FKCategoria_605219` FOREIGN KEY (`parent`) REFERENCES `categoria_ocupacional` (`id`);

--
-- Filtros para la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD CONSTRAINT `FKDepartamen508759` FOREIGN KEY (`id_unidad`) REFERENCES `unidad` (`id`);

--
-- Filtros para la tabla `departamento_cargo`
--
ALTER TABLE `departamento_cargo`
  ADD CONSTRAINT `FKDepartamen712274` FOREIGN KEY (`Departamentoid`) REFERENCES `departamento` (`id`),
  ADD CONSTRAINT `FKDepartamen995951` FOREIGN KEY (`Cargoid`) REFERENCES `cargo` (`id`);

--
-- Filtros para la tabla `levantamiento`
--
ALTER TABLE `levantamiento`
  ADD CONSTRAINT `CatOcup_Levant` FOREIGN KEY (`id_cat_ocup`) REFERENCES `categoria_ocupacional` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `nocturnidades`
--
ALTER TABLE `nocturnidades`
  ADD CONSTRAINT `Trabajador_Nocturnidad` FOREIGN KEY (`id_trabajador`) REFERENCES `trabajador` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD CONSTRAINT `FKTrabajador156627` FOREIGN KEY (`id_cat_doc`) REFERENCES `categoria_docente` (`id`),
  ADD CONSTRAINT `FKTrabajador57962` FOREIGN KEY (`id_escolar`) REFERENCES `nivel_escolar` (`id`),
  ADD CONSTRAINT `FKTrabajador580932` FOREIGN KEY (`id_departamento`) REFERENCES `departamento` (`id`),
  ADD CONSTRAINT `FKTrabajador605488` FOREIGN KEY (`id_CLA`) REFERENCES `cla` (`id`),
  ADD CONSTRAINT `FKTrabajador822340` FOREIGN KEY (`id_cargo`) REFERENCES `cargo` (`id`);

--
-- Filtros para la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD CONSTRAINT `FKUsuario_ro20423` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`),
  ADD CONSTRAINT `FKUsuario_ro869944` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
