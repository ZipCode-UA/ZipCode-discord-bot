module com.thorpjj.discord.bot.discordbotgui.discordbotgui {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.thorpjj.discord.bot.discordbotgui.discordbotgui to javafx.fxml;
    exports com.thorpjj.discord.bot.discordbotgui.discordbotgui;
}