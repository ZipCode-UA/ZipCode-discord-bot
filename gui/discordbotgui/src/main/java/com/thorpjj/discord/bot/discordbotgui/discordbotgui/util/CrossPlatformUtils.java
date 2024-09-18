package com.thorpjj.discord.bot.discordbotgui.discordbotgui.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CrossPlatformUtils {

    public static SystemCommandResults executeSystemCommand(String command) throws IOException, InterruptedException {

        Process proc = launchSystemProcess(command);
        List<String> lines = new ArrayList<>();
        BufferedReader stdIn = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        BufferedReader stdErr = new BufferedReader(new InputStreamReader(proc.getErrorStream()));

        int exitCode = proc.waitFor();

        String line;
        while ((line = stdIn.readLine()) != null) {
            lines.add(line);
        }
        String[] stdInLines = new String[lines.size()];
        lines.toArray(stdInLines);
        lines = new ArrayList<>();
        while ((line = stdErr.readLine()) != null) {
            lines.add(line);
        }
        String[] stdErrLines = new String[lines.size()];
        lines.toArray(stdErrLines);
        return new SystemCommandResults(stdInLines, stdErrLines, exitCode);
    }

    public static Process launchSystemProcess(String launchCommand) throws IOException {
        boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");
        String[] sysCmdStrs = isWindows ? new String[]{"cmd.exe", "/c"} : new String[]{"sh", "-c"};

        ProcessBuilder procBuilder = new ProcessBuilder();
        procBuilder.command(sysCmdStrs[0], sysCmdStrs[1], launchCommand);
        Process proc = procBuilder.start();
        return proc;
    }
}
