#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_LINE 1024

int main(void) {
    char filename[100];
    char search[100];
    char line[MAX_LINE];
    FILE *fp;
    int line_no = 1;
    int found = 0;

    printf("Enter file name: ");
    scanf("%s", filename);
    printf("Enter string to search: ");
    scanf("%s", search);

    fp = fopen(filename, "r");
    if (!fp) {
        printf("Error opening file.\n");
        return 1;
    }

    while (fgets(line, MAX_LINE, fp) != NULL) {
        if (strstr(line, search) != NULL) {
            printf("Line %d: %s", line_no, line);
            found = 1;
        }
        line_no++;
    }

    if (!found) {
        printf("String not found.\n");
    }

    fclose(fp);
    return 0;
}
