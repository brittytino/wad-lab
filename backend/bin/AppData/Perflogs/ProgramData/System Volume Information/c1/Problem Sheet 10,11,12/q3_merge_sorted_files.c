#include <stdio.h>
#include <stdlib.h>

/*
Usage (example):
./a.out file1.txt file2.txt DATA.txt
Each input file should contain sorted integers separated by spaces/newlines.
*/

int main(int argc, char *argv[]) {
    if (argc != 4) {
        printf("Usage: %s file1 file2 outfile\n", argv[0]);
        return 1;
    }

    FILE *f1 = fopen(argv[1], "r");
    FILE *f2 = fopen(argv[2], "r");
    FILE *out = fopen(argv[3], "w");

    if (!f1 || !f2 || !out) {
        printf("Error opening files.\n");
        return 1;
    }

    int n1, n2;
    int has1 = (fscanf(f1, "%d", &n1) == 1);
    int has2 = (fscanf(f2, "%d", &n2) == 1);

    while (has1 && has2) {
        if (n1 <= n2) {
            fprintf(out, "%d ", n1);
            has1 = (fscanf(f1, "%d", &n1) == 1);
        } else {
            fprintf(out, "%d ", n2);
            has2 = (fscanf(f2, "%d", &n2) == 1);
        }
    }

    while (has1) {
        fprintf(out, "%d ", n1);
        has1 = (fscanf(f1, "%d", &n1) == 1);
    }

    while (has2) {
        fprintf(out, "%d ", n2);
        has2 = (fscanf(f2, "%d", &n2) == 1);
    }

    printf("Merged sorted data written to %s\n", argv[3]);

    fclose(f1);
    fclose(f2);
    fclose(out);
    return 0;
}
