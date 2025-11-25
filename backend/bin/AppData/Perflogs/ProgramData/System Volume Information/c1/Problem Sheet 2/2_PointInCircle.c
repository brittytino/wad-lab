#include <stdio.h>
#include <math.h>

int main() {
    float x, y;
    printf("Enter coordinates (x y): ");
    scanf("%f %f", &x, &y);

    float distance = sqrt(x * x + y * y);

    if (distance < 5)
        printf("The point lies inside the circle\n");
    else if (distance > 5)
        printf("The point lies outside the circle\n");
    else
        printf("The point lies on the circle\n");

    return 0;
}
