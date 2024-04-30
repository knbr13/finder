#include <stdio.h>

int main() {
    printf("Super Calculator: \n");

    for (;;) {
        printf("> ");
        char *line = NULL;
        size_t len = 0;
        getline(&line, &len, stdin);
        if (line[0] == 'q') {
            break;
        }
        printf("%s\n", line);
    }

    return 0;
}