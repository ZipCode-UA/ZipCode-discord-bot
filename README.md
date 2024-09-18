# Discord.js v14.13.0 Typescript Bot Template

## Contents
- [Features](#toc-features)
    - [Handlers](#toc-feature-handlers)
    - [Startup Guard](#toc-feature-startup)
    - [Adding a Database](#toc-feature-db)
- [User Guide](#toc-user-guide)
    - [Environment Variables](#toc-guide-env)
    - [Creating Commands](#toc-guide-command-create)
    - [Creating Message Components](#toc-guide-components)
    - [Custom Permissions](#toc-guide-perms)
    - [Adding Startup Tasks](#toc-guide-startup)

<a id="toc-features"></a>  

## Feature Rundown
This template is intended to provide a significant amount of boilerplate code in order to allow users to hop right in to making features for their bot. A lot of inspiration has come from the official [Discord.js guide](https://discordjs.guide/#before-you-begin). This documentation will not, however, contain extensive information on how to use the Discord.js library.

<a id="toc-feature-handlers"></a>  

### Built-in Handlers:
This bot template comes with wrappers for event handlers for all of the Discord.js `Client` events. Most of these are empty and flagged to not be included at runtime with a few exceptions:

- `ClientReady` (src/util/handlers/ready.ts): Prints a message to the console indicating the bot has logged in and is ready to operate, then sets the bot's activity to a custom message
- `InteractionCreate` (../../../slash_commands.ts, modals.ts, select_menus.ts, buttons.ts): Each of these handlers registers files from the respectively named directories at the root of the project to automatically read in commands and message component responses at startup. 
    - **NOTE:** There is also an empty handler for this event at /.interaction_create.ts in case a custom handler is desirable for the event

<a id="toc-feature-startup"></a>

### Startup Guard
If one or more asyncronous tasks need to be completed before the bot becomes available on startup, this template provides a clean way to safely process those tasks before logging the bot in with an option to change the behavior of the bot or gracefully fail to start in the case of unexpected behavior from startup tasks.

<a id="toc-feature-db"></a>  

### Adding a Database
Due to the variety of database management systems available, I did not want to prescribe a specific database methodology for the project. It is possible that in the far future I may add some branches that contain database features, but for now users will have to add the database themselves if they want one.

<a id="toc-user-guide"></a>  

## User Guide

<a id="toc-guide-env"></a>

### Environment Variables
There are 3 .env files by default in the repository: `.env.pub`, `.env.dev`, and `.env.prod`. These files contain keys for a development server for the bot, a flag to enable the custom permissions module, a production bot token, a development bot token, a production bot client id, and a development bot client id. The scripts in package.json will use dotenvx to inject some combination of .env files into the bot on launch to allow multiple environments to be configured.

#### Important Environment Variables:
- .env.pub
    - `USE_CUSTOM_PERMS`: Set to TRUE to use the permissions module
    - `DEV_SERVER`: Set to your development server's Discord ID to use the dev scripts to deploy only to the dev server
- .env.prod
    - `TOKEN`: The token to use when logging in to the production bot
    - `CLIENT`: The Discord ID of the production bot's Discord user
- .env.dev
    - `TOKEN`: The token to use when logging in to the development bot
    - `CLIENT`: The Discord ID of the development bot's Discord user

<a id="toc-guide-command-create"></a>

### Creating a Command
Commands should be contained in a single file in the commands directory (`src/commands`). The bare minimum needed for a command to work in this template is a default export of the `ICommand` type:  
```typescript
    import { SlashCommandBuilder } from "discord.js";
    import { ICommand, ICommandPermission } from "../types/discord_interactions";

    const command: ICommand = {
        data: new SlashCommandBuilder()
            .setName('hello')
            .setDescription('Says hello')
            .addStringOption(option => 
                option.setName('stringoption')
                .setDescription('A string option')
                .setRequired(true)
            ) as SlashCommandBuilder, // Adding an option changes the builder type to an option builder. It is safe to cast it back to SlashCommandBuilder.
        execute: async (interaction) => {
            let stringoption = interaction.options.getString('stringoption');
            await interaction.reply({content: `\`\`\`Hello ${stringoption}\`\`\``});
        },
        permissions: ICommandPermission.ALL
    }

    export default command;
```

<a id="toc-guide-components"></a>

### Using Buttons, SelectMenus, and Modals

Buttons, SelectMenus, and Modals all have the same basic structure in this template, with the only differences being how they are built using Discord.js. To add a new custom component, start by going to the directory for that component and making a new file that default exports that component's type (`IButton`, `ISelectMenu`, `IModal`):

```TypeScript
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { IButton, ICommandPermission } from "../types/discord_interactions";

const customId = 'hello'

const button: IButton = {
  customId: customId,
  execute: async (interaction, idArgs) => {
    await interaction.reply({content:"You pressed a button!"});
  },
  permissions: ICommandPermission.ALL,
  button: () => {
    return new ButtonBuilder()
      .setCustomId(customId)
      .setStyle(ButtonStyle.Primary)
      .setLabel("Hello");
  }
}

export default button;
```

The `button` property (or corresponsing property for other component types) can take in any amount of arguments as needed to build the component, and this property should be used to consistently construct the component wherever it is used in the bot.

Components in this template are allowed to have arguments passed in and parsed out of their custom IDs. To add arguments to the custom ID of a component, set the ID as a string with the component's ID (to identify the function to use), followed by the arguments all separated by colons.

**idArgs example:**
```typescript
// to be put in {component}Builder().setCustomId()
const customId = `${componentId}:${argOne}:${argTwo}` // .. etc.

// to extract args in execute()
const myArgOne = idArgs[1] // args start at index 1 - index 0 is the actual ID
```

<a id="toc-guide-perms"></a>

### Command Permissions
This template povides an optional custom permissions system. This can be enabled by setting the environment variable `USE_CUSTOM_PERMISSIONS=TRUE`. By default, the permissions system comes with two permission levels represented in the `ICommandPermission` enum: `ICommandPermission.ALL` (anyone can use) and `ICommandPermission.SERVER_OWNER` (server owner only). 

To create or customize custom permissions, two changes need to be made. First, a value representing the new permission level needs to be added to the `ICommandPermission` enum located at `src/types/discord_interactions.ts`:  
```TypeScript
export enum ICommandPermission {
    ALL,
    SERVER_OWNER,
    MY_NEW_PERMISSION_LEVEL // add your value here
}
```

Next, a new file should be created in `src/util/permissions/permission_levels` whose default export is of the type `IPermission` and uses the new permission value created in the `ICommandPermission` enum:
```typescript
import { ICommandPermission } from "../../../types/discord_interactions";
import { IPermission } from "../permissions";

const myNewPermission: IPermission = {
    permLevel: ICommandPermission.MY_NEW_PERMISSION_LEVEL,
    permCheck: async (interaction) => {
        // Authenticate the interaction according to the new permission level
        return !interaction.inGuild();
    }
}

export default permServerOwner;
```

From here, the template should read in the new permission file on startup.

<a id="toc-guide-startup"></a>

### Adding Startup Tasks

When working with multi-system applications, it might be desireable to delay logging in the bot until all of the services it depends on have been connected to. The startup module located at `src/util/bot_runner` provides an easy interface to drop startup tasks into. To create a startup task, create a file that default exports the `IStartupEvent` type from `src/types/startup.ts`:

```typescript
// src/util/bot_runner/startup_events/my_startup_task.ts
import { IStartupEvent } from "../../../types/startup";
import { getDatabase, getDatabaseDependentServices } from "~/path/to/database/implementation";

const event: IStartupEvent = {
    event: "connect_to_db", // identifier for the event
    critical: false, // if true, bot will abort startup in the case of task failure
    runner: async () => {
        const db = await getDatabase();
        return db ? true : false; // return true on success, false on fail
    }, // this code will run before the bot logs in
    onFail: async () => {
        const services = await getDatabaseDependentServices();
        for (const service of services) {
            service.disable();
        }
    } // (optional) this code will run if the runner returns false
    useEvent: true, // if true, this task will be run
}

export default event;
```