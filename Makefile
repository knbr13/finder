build:
	@gcc -o exec *.c

clear:
	clear

run:
	@./exec

all: clear build run
