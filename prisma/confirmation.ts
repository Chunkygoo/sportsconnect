import prompt from "prompt";

const schema = {
  properties: {
    confirmation: {
      description: `You are about to seed the database. This will first \ndelete all data!!! Are you sure you want to continue? [Y/N]`,
      required: true,
    },
  },
};
prompt.start();
prompt.get(schema, function (err, result) {
  if (err) process.exit(1);
  if (result.confirmation !== "Y") {
    console.error(
      "Must type 'Y' to seed db. Any other input will terminate the process. Aborting..."
    );
    process.exit(1);
  }
});
