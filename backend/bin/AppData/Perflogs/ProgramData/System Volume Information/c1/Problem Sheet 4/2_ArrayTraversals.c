#include <stdio.h>

int main() {
    int m, n, i, j;

    printf("Enter rows and columns: ");
    scanf("%d %d", &m, &n);

    int a[m][n];

    printf("Enter elements of the matrix:\n");
    for (i = 0; i < m; i++)
        for (j = 0; j < n; j++)
            scanf("%d", &a[i][j]);

    // 1. To-and-fro row-major order
    printf("\nTo-and-fro Row Major Order:\n");
    for (i = 0; i < m; i++) {
        if (i % 2 == 0) {
            for (j = 0; j < n; j++)
                printf("%d ", a[i][j]);
        } else {
            for (j = n - 1; j >= 0; j--)
                printf("%d ", a[i][j]);
        }
    }
    printf("\n");

    // 2. Diagonal-major order (for square matrix)
    if (m == n) {
        printf("\nDiagonal Major Order:\n");
        for (int k = 0; k < 2 * n - 1; k++) {
            for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    if (i + j == k)
                        printf("%d ", a[i][j]);
                }
            }
        }
        printf("\n");
    }

    // 3. Spiral order
    printf("\nSpiral Order:\n");
    int top = 0, bottom = m - 1, left = 0, right = n - 1;
    while (top <= bottom && left <= right) {
        for (j = left; j <= right; j++) printf("%d ", a[top][j]);
        top++;
        for (i = top; i <= bottom; i++) printf("%d ", a[i][right]);
        right--;
        if (top <= bottom) {
            for (j = right; j >= left; j--) printf("%d ", a[bottom][j]);
            bottom--;
        }
        if (left <= right) {
            for (i = bottom; i >= top; i--) printf("%d ", a[i][left]);
            left++;
        }
    }
    printf("\n");

    return 0;
}
