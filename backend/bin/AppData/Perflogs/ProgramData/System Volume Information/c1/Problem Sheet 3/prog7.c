#include <stdio.h>
int main() {
    int n,k,i,j,count;
    printf("Enter number of elements: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter elements: ");
    for(i=0;i<n;i++) scanf("%d",&arr[i]);
    printf("Enter k: ");
    scanf("%d",&k);

    for(i=0;i<n;i++) {
        count=1;
        for(j=i+1;j<n;j++) {
            if(arr[i]==arr[j]) count++;
        }
        if(count > n/k) printf("%d appears more than n/k times\n", arr[i]);
    }
    return 0;
}
