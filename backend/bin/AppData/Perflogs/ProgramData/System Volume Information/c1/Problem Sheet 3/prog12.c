#include <stdio.h>
int main() {
    int n,k,i,j;
    printf("Enter number of elements: ");
    scanf("%d",&n);
    int arr[n];
    printf("Enter elements: ");
    for(i=0;i<n;i++) scanf("%d",&arr[i]);
    printf("Enter k: ");
    scanf("%d",&k);

    for(i=0;i<n;i++) {
        for(j=i+1;j<=i+k && j<n;j++) {
            if(arr[i]==arr[j]) { 
                printf("Duplicate %d found within distance %d\n", arr[i], k);
                return 0; 
            }
        }
    }
    printf("No duplicates within distance %d\n", k);
    return 0;
}
