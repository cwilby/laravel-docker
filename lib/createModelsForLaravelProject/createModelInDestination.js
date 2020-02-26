const { exec } = require("child-process-promise");
const pluralize = require("pluralize");

async function runAndLogCommand(command, destination) {
  const { stdout } = await exec(command, { cwd: destination });
  console.log(stdout);
}

const createModel = (model, destination) =>
  runAndLogCommand(`php artisan make:model Models\\\\${model}`, destination);

const createFactory = (model, destination) =>
  runAndLogCommand(
    `php artisan make:factory --no-interaction --model=Models\\\\${model} ${model}Factory`,
    destination
  );

const createMigration = (model, destination) => {
  const pluralizedModel = pluralize(model.toLowerCase());
  runAndLogCommand(
    `php artisan make:migration --no-interaction --create=${pluralizedModel} create_${pluralizedModel}_table`,
    destination
  );
};

const createSeeder = (model, destination) =>
  runAndLogCommand(
    `php artisan make:seeder --no-interaction ${model}Seeder`,
    destination
  );

const createResource = async (model, destination) => {
  await runAndLogCommand(
    `php artisan make:resource ${model}Resource`,
    destination
  );
  await runAndLogCommand(
    `php artisan make:resource --no-interaction --collection ${pluralize(
      model
    )}Collection`,
    destination
  );
};

const createController = (model, destination) =>
  runAndLogCommand(
    `php artisan make:controller --no-interaction --api --resource --model=Models\\\\${model} ${pluralize(
      model
    )}Controller`,
    destination
  );

module.exports = async function createModelInDestination(model, destination) {
  try {
    await createModel(model, destination);
    await createFactory(model, destination);
    await createMigration(model, destination);
    await createSeeder(model, destination);
    await createResource(model, destination);
    await createController(model, destination);
  } catch (error) {
    console.log(`❗️Error while creating "${model}" model`);
    console.error(error);
  }
};
