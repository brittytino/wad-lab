#include <stdio.h>
int main() {
    int n, i, sum = 0;
    printf("Enter a number: ");
    scanf("%d",&n);

    printf("Factors: ");
    for(i=1;i<n;i++){
        if(n%i==0){
            sum+=i;
            printf("%d ", i);
        }
    }
    printf("\n");
    if(sum==n) printf("%d is a Perfect Number\n", n);
    else printf("%d is Not Perfect\n", n);
    return 0;
}
