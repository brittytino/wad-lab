#include <stdio.h>
int main() {
    int n, i, j;
    printf("Enter rows: ");
    scanf("%d", &n);

    // Right Triangle
    for(i=1;i<=n;i++){
        for(j=1;j<=i;j++) printf("*");
        printf("\n");
    }
    printf("\n");

    // Pyramid
    for(i=1;i<=n;i++){
        for(j=i;j<n;j++) printf(" ");
        for(j=1;j<=2*i-1;j++) printf("*");
        printf("\n");
    }
    printf("\n");

    // Diamond
    for(i=1;i<=n;i++){
        for(j=i;j<n;j++) printf(" ");
        for(j=1;j<=2*i-1;j++) printf("*");
        printf("\n");
    }
    for(i=n-1;i>=1;i--){
        for(j=i;j<n;j++) printf(" ");
        for(j=1;j<=2*i-1;j++) printf("*");
        printf("\n");
    }
    printf("\n");

    // Right Arrow
    for(i=1;i<=n;i++){
        for(j=1;j<=i;j++) printf("*");
        printf("\n");
    }
    for(i=n-1;i>=1;i--){
        for(j=1;j<=i;j++) printf("*");
        printf("\n");
    }

    return 0;
}
