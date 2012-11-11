CC=gcc


all: simd matrix


matrix: mm-seq.c
	$(CC) -O3 mm-seq.c -o matrix -lrt


simd:	simd-intel.c
	$(CC) -O3 -msse3 -fstrict-aliasing simd-intel.c -o simd -lrt

clean:
	rm -rf simd matrix
