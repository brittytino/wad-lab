#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char filename[100];
    FILE *fp;
    char word[100];
    int count = 0;

    printf("Enter file name: ");
    scanf("%s", filename);

    fp = fopen(filename, "r");
    if (!fp) {
        printf("Error opening file.\n");
        return 1;
    }

    while (fscanf(fp, "%99s", word) == 1) {
        if (strcmp(word, "vacation") == 0) {
            count++;
        }
    }

    printf("The word \"vacation\" appears %d time(s).\n", count);

    fclose(fp);
    return 0;
}
