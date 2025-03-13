cmake_minimum_required(VERSION 3.22)

project(ZipCode-Bot VERSION 1.0 DESCRIPTION "Discord bot for the ZipCode Discord")
 
list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake)
 
add_executable(${PROJECT_NAME}
    src/main.cpp
    src/slashCommands/pingCommand.cpp
    src/slashCommands/setColorCommand.cpp
)
 
find_package(DPP REQUIRED)
 
target_link_libraries(${PROJECT_NAME} 
    ${DPP_LIBRARIES}
)
 
target_include_directories(${PROJECT_NAME} PRIVATE
    ${DPP_INCLUDE_DIR}
)

target_include_directories(${PROJECT_NAME} PRIVATE
    include
)
 
set_target_properties(${PROJECT_NAME} PROPERTIES
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED ON
)

add_custom_target(run 
        COMMENT "Run the bot"
        MESSAGE "Running bot..."
        COMMAND dotenvx run build/${PROJECT_NAME}
        DEPENDS ${PROJECT_NAME}
        USES_TERMINAL
        WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}
)
