import { AppRepository, FakeFileRepository } from "./infrastructure/repository";

const repository: AppRepository = new FakeFileRepository();

export default async function () {
  try {
    const tenants = await repository.getTenants();
    return tenants;
  } catch (e) {
    console.error("Unable to retrieve tenants", e.message, e.stack);
    return [];
  }
}
