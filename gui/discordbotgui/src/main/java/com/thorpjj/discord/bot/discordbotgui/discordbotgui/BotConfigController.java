package com.thorpjj.discord.bot.discordbotgui.discordbotgui;

import com.thorpjj.discord.bot.discordbotgui.discordbotgui.util.CrossPlatformUtils;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class BotConfigController {
    @FXML
    private Label botStatusText;

    /**
     * Creates a new process to run the bot, then creates a new thread
     * to run in the background relaying the bot's console to the GUI until
     * it shuts down
     */
    @FXML
    protected void onRunBotClick() {

        Thread t;
        Process proc;
        try {
            proc = CrossPlatformUtils.launchSystemProcess("npm run bot");
            botStatusText.setText("Bot running!");
            t = new Thread(() -> {
                try {
                    int exitCode = proc.waitFor();
                    botStatusText.setText("Bot offline!");
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            });
        } catch (Exception e) {
            System.err.println("Unable to start bot.");
            botStatusText.setText("Failed to launch bot!");
        }

    }

    @FXML
    protected void onEditConfigClick() {

    }
}
