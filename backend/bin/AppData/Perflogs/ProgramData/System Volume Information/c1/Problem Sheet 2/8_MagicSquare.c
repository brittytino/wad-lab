#include <stdio.h>

int main() {
    int n;
    printf("Enter size of magic square (odd n): ");
    scanf("%d", &n);

    if (n % 2 == 0 || n <= 0) {
        printf("Invalid input\n");
        return 0;
    }

    int magic[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            magic[i][j] = 0;

    int i = 0, j = n / 2;
    for (int num = 1; num <= n * n; num++) {
        magic[i][j] = num;
        int newi = (i - 1 + n) % n;
        int newj = (j + 1) % n;
        if (magic[newi][newj] != 0)
            i = (i + 1) % n;
        else {
            i = newi;
            j = newj;
        }
    }

    printf("Magic Square:\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++)
            printf("%4d", magic[i][j]);
        printf("\n");
    }
    return 0;
}
