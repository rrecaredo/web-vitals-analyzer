type ResourceEntity = {
    id: string;
    name: string;
}

export type Application = ResourceEntity;
export type Tenant = ResourceEntity & {
    applications: Application[];
};
