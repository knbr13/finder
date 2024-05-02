#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *line;
    int END_OF_FILE;
} LineResult;

LineResult readline(FILE *stream) {
    int offset = 0, buf_size = 4, c;

    char *buf = malloc(buf_size * sizeof(char));
    if (buf == NULL) {
        return (LineResult){.line = NULL, .END_OF_FILE = 0};
    }

    while ((c = getc(stream)) != '\n') {
        if (c == EOF) {
            free(buf);
            return (LineResult){.line = NULL, .END_OF_FILE = 1};
        }
        if (offset == buf_size - 1) {
            char *new_buf = realloc(buf, (buf_size *= 2));
            if (new_buf == NULL) {
                free(buf);
                return (LineResult){.line = NULL, .END_OF_FILE = 0};
            }
            buf = new_buf;
        }
        buf[offset++] = c;
    }

    if (offset < buf_size - 1) {
        char *new_buf = realloc(buf, offset + 1);
        if (new_buf == NULL) {
            return (LineResult){.line = NULL, .END_OF_FILE = 0};
        }
        buf = new_buf;
    }

    buf[offset] = '\0';
    return (LineResult){.line = buf, .END_OF_FILE = 0};
}

int isUpper(char c) {
    return c >= 'A' && c <= 'Z';
}

int isLower(char c) {
    return c >= 'a' && c <= 'z';
}

int main(int argc, char **argv) {
    if (argc < 2) {
        printf("Usage: %s <search keyword>\n", argv[0]);
        return EXIT_FAILURE;
    }
    while (1 != 0) {
        LineResult line = readline(stdin);
        if (line.END_OF_FILE) {
            break;
        }
        int i;
        if (i = strstr(line.line, argv[1]) != NULL) {
            printf("%d: %s\n", i, line.line);
        }
        free(line.line);
    }

    return EXIT_SUCCESS;
}