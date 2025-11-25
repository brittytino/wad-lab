#include <stdio.h>

int main() {
    int n, i, j;
    printf("Enter size of square matrix: ");
    scanf("%d", &n);

    int A[n][n], B[n][n], C[n][n];

    printf("Enter elements of matrix A (%d x %d):\n", n, n);
    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            scanf("%d", &A[i][j]);

    // Compute B (symmetric) and C (skew-symmetric)
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            B[i][j] = (A[i][j] + A[j][i]) / 2;
            C[i][j] = (A[i][j] - A[j][i]) / 2;
        }
    }

    printf("\nSymmetric Matrix B:\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++)
            printf("%d ", B[i][j]);
        printf("\n");
    }

    printf("\nSkew-Symmetric Matrix C:\n");
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++)
            printf("%d ", C[i][j]);
        printf("\n");
    }

    return 0;
}
