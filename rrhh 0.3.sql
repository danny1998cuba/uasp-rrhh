-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-08-2022 a las 06:25:08
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cla`
--

CREATE TABLE `cla` (
  `id` int(10) NOT NULL,
  `grupo` varchar(255) NOT NULL,
  `salario` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `email` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `username`, `PASSWORD`, `nombre`, `apellidos`, `email`, `telefono`, `enabled`) VALUES
(1, 'danny98cuba', '$2a$10$7XK94bZWkQsECj8B/Kf./.IscfpxVli.dh0kaKGd0Tw7qOBfWsif6', 'Daniel', 'Gonzalez Cuetara', 'danny.glezcuet98@gmail.com', NULL, 1);

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
(1, 1);

--
-- Índices para tablas volcadas
--

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
-- Indices de la tabla `nivel_escolar`
--
ALTER TABLE `nivel_escolar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

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
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria_docente`
--
ALTER TABLE `categoria_docente`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria_ocupacional`
--
ALTER TABLE `categoria_ocupacional`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cla`
--
ALTER TABLE `cla`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `escala`
--
ALTER TABLE `escala`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nivel_escolar`
--
ALTER TABLE `nivel_escolar`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

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
