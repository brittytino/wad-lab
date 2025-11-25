#include <stdio.h>

int main() {
    int n, m, k, i, count = 0, result = 0;

    printf("Enter n, m, and k: ");
    scanf("%d %d %d", &n, &m, &k);

    // Find divisors common to n, m and ≤ k
    for (i = k; i >= 1; i--) {
        if (n % i == 0 && m % i == 0) {
            count++;
            if (count == 3) {
                result = i;
                break;
            }
        }
    }

    printf("Result: %d\n", result);
    return 0;
}
