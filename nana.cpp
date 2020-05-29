#include <iostream>
#include <fstream>

using namespace std;
/* run this program using the console pauser or add your own getch, system("pause") or input loop */

int main(int argc, char** argv) {
	
	string tab[1000];

	ifstream plik1;
	ofstream plik2;
	int i=0;
	
	plik1.open("a.txt");
	while(!plik1.eof())
	{
		plik1>>tab[i];
		i++;
	}
	plik1.close();
	plik2.open("b.txt");
	
	cout<<"Content-Type: application/json; charset=UTF-8; Access-Control-Allow-Origin: *" << (char)13 << (char)10;
	cout<<endl<<"[";
	for(int k=0;k<i;k++)
	{
			cout<<"{\"title\":\""<<tab[k]<<"\",\"subtitle\":\""<<tab[k++]<<"\"}";
			if(k<i-1)
			cout<<",";
			
	}
	
	cout<<"]";
	plik2.close();
	return 0;
}
