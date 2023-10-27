import { evaluateAndReturn } from "./infrastructure";
import { AppRepository, FakeFileRepository } from "./infrastructure/repository";

const repository: AppRepository = new FakeFileRepository();

export default async function () {
  return evaluateAndReturn(repository.getTenantsWithAggregatedData, "tenants");
}
