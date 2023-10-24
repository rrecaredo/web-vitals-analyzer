import { Tenant } from "./models";

// fakeDatabase simulates a relational database containing tenants, applications and their relationships.
import fakeDatabase from "./data.json" assert { type: "json" };

export interface AppRepository {
  getTenants(): Promise<Tenant[]>;
}

export class FakeFileRepository implements AppRepository {
  async getTenants(): Promise<Tenant[]> {

    if (!("tenants" in fakeDatabase)) {
        throw new Error("Missing tenants in fakeDatabase");
    }

    return fakeDatabase.tenants.map(
      ({ tenant_id, tenant_name, applications }) => ({
        id: tenant_id,
        name: tenant_name,
        applications: fakeDatabase.applications
          .filter(({ application_id }) => applications.includes(application_id))
          .map(({ application_id, application_name }) => ({
            id: application_id,
            name: application_name,
          })),
      })
    );
  }
}
