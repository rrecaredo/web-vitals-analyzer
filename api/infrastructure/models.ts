interface ResourceEntity {
  id: string;
  name: string;
}

export interface Application extends ResourceEntity { pages: string[] }

export interface Tenant extends ResourceEntity {
  applications: Application[];
}
