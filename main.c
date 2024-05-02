#include <stdio.h>
#include <stdlib.h>

char *readline(FILE *stream) {
    int offset = 0, buf_size = 4, c;

    char *buf = malloc(buf_size * sizeof(char));
    if (buf == NULL) {
        return NULL;
    }

    while ((c = getc(stream)) != '\n' && c != EOF) {
        if (offset == buf_size - 1) {
            char *new_buf = realloc(buf, (buf_size *= 2));
            if (new_buf == NULL) {
                free(buf);
                return NULL;
            }
            buf = new_buf;
        }
        buf[offset++] = c;
    }

    if (c == EOF && offset == 0) {
        free(buf);
        return NULL;
    }

    if (offset < buf_size - 1) {
        char *new_buf = realloc(buf, offset + 1);
        if (new_buf == NULL) {
            return NULL;
        }
        buf = new_buf;
    }

    buf[offset] = '\0';
    return buf;
}

int main() {
    printf("enter your name: ");
    char *line = readline(stdin);
    printf("hello, %s\n", line);
    return 0;
}