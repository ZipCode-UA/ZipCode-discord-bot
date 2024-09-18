package com.thorpjj.discord.bot.discordbotgui.discordbotgui;

import com.thorpjj.discord.bot.discordbotgui.discordbotgui.util.CrossPlatformUtils;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class BotGuiController {
    @FXML
    private Label botStatusText;

    private Process botProcess;
    private Thread botProcessCallbackThread;

    /**
     * Creates a new process to run the bot, then creates a new thread
     * to run in the background relaying the bot's console to the GUI until
     * it shuts down
     */
    @FXML
    protected void onRunBotClick() {

        try {
            botProcess = CrossPlatformUtils.launchSystemProcess("npm run bot");
            botStatusText.setText("Bot running!");
            botProcessCallbackThread = new Thread(() -> {
                try {
                    CompletableFuture<Integer> exitCode = botProcess.onExit().thenApply(Process::exitValue);
                    int code = exitCode.get();
                    botStatusText.setText(String.format("Bot Offline! Ended %d", code));
                } catch (InterruptedException | ExecutionException e) {
                    botStatusText.setText(String.format("Bot Offline! Exception caught: %s", e.getClass().getSimpleName()));
                }
            });
            botProcessCallbackThread.start();
            botProcessCallbackThread.join();
        } catch (Exception e) {
            System.err.println("Unable to start bot.");
            botStatusText.setText("Failed to launch bot!");
            botProcess = null;
            botProcessCallbackThread = null;
        }

    }

    @FXML
    protected void onEditConfigClick() {

    }
}