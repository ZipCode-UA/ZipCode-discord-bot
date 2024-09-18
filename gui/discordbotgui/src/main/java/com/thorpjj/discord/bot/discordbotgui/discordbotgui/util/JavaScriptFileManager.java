package com.thorpjj.discord.bot.discordbotgui.discordbotgui.util;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Utility class to make specific minor edits to properly formatted Javascript files.
 * Expects semicolon delimited lines
 *
 */
public class JavaScriptFileManager {

    private final Path path;
    private File file;
    private int flags;

    public enum Options {
        READ=

    }

    /**
     * Creates and opens an instance linked to the file at
     * path. If the specified path or file doesn't exist, creates
     * a new javascript file at that path
     *
     * @param path Target path to open or create
     */
    public JavaScriptFileManager(Path path) throws IOException {

        this.path = path;

        // Create path and file if possible
        if (!Files.isReadable(path)) {
            Files.createDirectories(path.getParent());
            File f = Files.createFile(path);
        };
    }

    public void locateVariableAssignments() {

    }

}
