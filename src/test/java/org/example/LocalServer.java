package org.example;

import java.io.File;

public class LocalServer {

    private static Process localServerProcess;

    public static void startLocalServer() {
        // Command to start the local server
        String command = "python";
        String scriptPath = "D:\\Desktop\\UNM_SQA_2023-24\\app.py"; // Replace with the actual path to the Python script

        // Build the command for starting the local server
        ProcessBuilder processBuilder = new ProcessBuilder(command, scriptPath);

        // Set the working directory for the process (where the Python script is located)
        processBuilder.directory(new File("D:\\Desktop\\UNM_SQA_2023-24")); // Replace with the actual directory path

        try {
            // Start the process
            localServerProcess = processBuilder.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void stopLocalServer() {
        // Stop the local server process
        if (localServerProcess != null) {
            localServerProcess.destroy();
        }
    }
}
