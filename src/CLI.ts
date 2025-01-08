import type { Choice, PromptType } from "prompts";

import prompts from "prompts";

export interface CLIChoice extends Choice {
  action: Function;
}

 
let solde = 100;

/**
 * Represents a Command Line Interface (CLI) utility.
 */
export class CLI {
  /**
   * An array of choices available in the CLI menu.
   */
  public choices: CLIChoice[] = [];

  /**
   * Creates an instance of the CLI class.
   * @param choices - An array of CLIChoice objects to initialize the CLI with.
   */
  constructor(choices: CLIChoice[] = []) {
    this.choices = choices;
  }

  /**
   * Prompts the user to input a value.
   * @param message - The message to display to the user.
   * @param type - The type of input expected ("text" or "number").
   * @returns A promise that resolves to the user's input, either a string or a number.
   */
  public static async askValue(message: string, type: "text"): Promise<string>;
  public static async askValue(
    message: string,
    type: "number"
  ): Promise<number>;
  public static async askValue(
    message: string,
    type: PromptType = "text"
  ): Promise<string | number> {
    const response = await prompts({
      type,
      name: "value",
      message,
    });

    return response.value;
  }

  /**
   * Displays a menu to the user with the available choices.
   * If a choice is selected, its action is executed.
   * If "Quitter" is selected, calls the `quit` method.
   */
  public async menu() {
    const response = await prompts({
      type: "select",
      name: "action",
      message: "Que voulez-vous faire ?",
      choices: [
        ...this.choices.map((choice) => ({
          title: choice.title,
          value: choice.value,
        })),
        { title: "Quitter", value: "quit" },
      ],
    });

    const choice = this.choices.find(
      (choice) => choice.value === response.action
    );

    if (choice) await choice.action();
    else await this.quit();

    console.log("\n");
  }

  /**
   * Quit the CLI and exit the program.
   * Waits for a random time between 0 and 2 seconds before exiting.
   */
  private async quit() {
    const randomTime = Math.floor(Math.random() * 2); // Random time between 0 and 2 seconds
    await new Promise((resolve) => setTimeout(resolve, randomTime * 1000));

    console.log("Au revoir !");
    process.exit(0);
  }

 public async connexion() {
  const user = {
    username: "username",
    password: "password",
  }

  const username = await CLI.askValue(
    "Entrez votre nom d'utilisateur :",
    "text"
  );
  const password = await CLI.askValue(
    "Entrez votre mot de passe :",
    "text"
  );

  if (username === user.username && password === user.password) {
    console.log(`Vous êtes bien connecté.e.`);
    this.connect();
  } else {
    console.log("Erreur lors de la connexion, veuillez réessayer.");
  }
 }

 public async connect(){
  const response = await prompts({
    type: "select",
    name: "action",
    message: "Quelle action voulez-vous faire ?",
    choices: [
        { title: "Déposer de l'argent", value: "depot" },
        { title: "Retirer de l'argent", value: "retrait" },
        { title: "Voir l'historique", value: "historique" },
        { title: "Voir le solde", value: "solde" },
        { title: "Quitter", value: "quitter" },
      ],
    });
  
    switch (response.action) {
      case "depot":
        this.depot();
        break;
      case "retrait":
        this.retrait();
        break;
      case "historique":
        console.log("Voir l'historique (fonctionnalité à implémenter).");
        break;
      case "solde":
        this.solde();
        break;
      case "quitter":
        this.quit();
    }
 }

 public async solde(){
  console.log("Votre solde est de " + solde);
  this.connect();
 }

 public async depot() {
  const deposer = await prompts({
    type: "number",
    name: "value",
    message: "Combien d'argent voulez-vous déposer ?",
    validate: (value) => (Number.isInteger(value) && value > 0 ? true : "Vous devez déposer un montant supérieur à 0.")
  })
  solde += deposer.value;
  console.log("Votre nouveau solde est de " + solde);
  this.connect();
 }

 public async retrait(){
  const retrait = await prompts({
    type: "number",
    name: "value",
    message:"Combien d'argent voulez-vous retirer ?",
    validate: (value) => (Number.isInteger(value) && value > 0 ? true : "Vous devez retirer un montant supérieur à 0.")
  })
  solde -= retrait.value;
  console.log("Votre nouveau solde est de " + solde);
  this.connect();
 }
}
