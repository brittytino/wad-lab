#include <stdio.h>

int main() {
    int n, i, sum = 0, expectedSum, num, duplicate;

    printf("Enter value of N: ");
    scanf("%d", &n);

    expectedSum = n * (n + 1) / 2;  // sum of first N numbers

    printf("Enter %d numbers (1 to %d, with one duplicate):\n", n, n);
    for (i = 0; i < n; i++) {
        scanf("%d", &num);
        sum += num;
    }

    duplicate = sum - expectedSum;  // difference gives the duplicate
    printf("Duplicate number is: %d\n", duplicate);

    return 0;
}
