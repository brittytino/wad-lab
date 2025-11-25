#include <stdio.h>
int main() {
    float t, p;
    printf("Enter t: ");
    scanf("%f", &t);

    if (t > 0 && t <= 2)
        p = 20;
    else if ((t > 13 && t <= 16) || (t > 30))
        p = 4 * (t + 2);
    else
        p = 4 * (t*t + 2*t);

    printf("p(t) = %f\n", p);
    return 0;
}
