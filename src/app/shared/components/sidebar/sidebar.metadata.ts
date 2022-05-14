import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ISidebarData {
    icon: IconDefinition,
    options: {
        link: string,
        nombre: string
    }[]
}