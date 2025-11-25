#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int main(void) {
    char src_name[100], dest_name[100];
    FILE *src, *dest;
    int ch;

    printf("Enter source file name: ");
    scanf("%s", src_name);
    printf("Enter destination file name: ");
    scanf("%s", dest_name);

    src = fopen(src_name, "r");
    dest = fopen(dest_name, "w");

    if (!src || !dest) {
        printf("Error opening file.\n");
        return 1;
    }

    while ((ch = fgetc(src)) != EOF) {
        fputc(toupper(ch), dest);
    }

    printf("File copied with lowercase converted to uppercase.\n");

    fclose(src);
    fclose(dest);
    return 0;
}
