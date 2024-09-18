package com.thorpjj.discord.bot.discordbotgui.discordbotgui.util;

public class SystemCommandResults {

    public String[] stdIn;
    public String[] stdErr;
    public int exitCode;

    public SystemCommandResults(String[] in, String[] err, int code) {
        stdIn = in;
        stdErr = err;
        exitCode = code;
    }

}
