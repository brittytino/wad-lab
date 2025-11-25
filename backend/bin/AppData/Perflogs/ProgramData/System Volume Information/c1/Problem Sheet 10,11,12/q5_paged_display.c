#include <stdio.h>
#include <stdlib.h>

#define MAX_LINE 1024

int main(void) {
    char filename[100];
    FILE *fp;
    char line[MAX_LINE];
    int count = 0;
    int ch;

    printf("Enter file name: ");
    scanf("%s", filename);

    fp = fopen(filename, "r");
    if (!fp) {
        printf("Error opening file.\n");
        return 1;
    }

    while (fgets(line, MAX_LINE, fp) != NULL) {
        printf("%s", line);
        count++;

        if (count == 5) {
            printf("\n--- Press 'q' to quit, any other key to continue ---\n");
            ch = getchar(); // flush newline from previous input
            ch = getchar();
            if (ch == 'q' || ch == 'Q') {
                break;
            }
            count = 0;
        }
    }

    fclose(fp);
    return 0;
}
