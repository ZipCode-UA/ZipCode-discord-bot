cmake_minimum_required(VERSION 3.31)

project(zipcode-discord-bot VERSION 0.0.0 DESCRIPTION "Discord bot for the Zipcode Club at UAkron")
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# DPP Dependency
list(APPEND CMAKE_MODULE_PATH ${CMAKE_CURRENT_SOURCE_DIR}/cmake)
find_package(DPP REQUIRED)

# Bot executable target
set(BOT_EXE "bot")
add_executable(${BOT_EXE} src/bot.cpp)
set_target_properties(${BOT_EXE} PROPERTIES VERSION 0.0.0 SOVERSION 0)

# Linkage
target_link_libraries(bot ${DPP_LIBRARIES})

# Include
target_include_directories(${BOT_EXE} PRIVATE ${DPP_INCLUDE_DIR})