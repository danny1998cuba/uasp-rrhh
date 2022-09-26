import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ISidebarData {
    icon: IconDefinition,
    secionName: string,
    rootLink: string,
    groups: {
        title?: string,
        options: {
            link: string,
            nombre: string,
            img?: string,
            description?: string,
            roles: string[]
        }[]
    }[]
}