#include <stdio.h>
#include <math.h>

int main() {
    double x, sum = 0.0;
    printf("Enter value of x: ");
    scanf("%lf", &x);

    for (int k = 0; k < 20; k++) {
        double term = pow(-1, k) * pow(x / 2.0, 2 * k) / (tgamma(k + 1) * tgamma(k + 1));
        sum += term;
    }
    printf("J0(%.2lf) ≈ %.6lf\n", x, sum);

    return 0;
}
