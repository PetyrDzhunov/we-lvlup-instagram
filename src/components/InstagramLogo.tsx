import { Box } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'

interface InstagramLogoProps {
    layoutLogo?: boolean
}

function InstagramLogo({ layoutLogo }: InstagramLogoProps): JSX.Element {
    if (layoutLogo) {
        return (
            <Box
                sx={{
                    margin: '0px',
                    fontSize: '40px',
                    color: 'black',
                }}
            >
                <SvgIcon
                    fontSize="large"
                    viewBox="0 -5 130 40"
                    sx={{ width: '100%' }}
                >
                    <path
                        d="M 6.33,0.12
		 C 3.81,1.17 1.04,4.17 0.17,7.91
			 -0.94,12.66 3.67,14.67 4.04,14.01
			 4.48,13.23 3.21,12.97 2.95,10.50
			 2.62,7.33 4.10,3.78 5.96,2.22
			 6.30,1.93 6.29,2.33 6.29,3.08
			 6.29,4.42 6.22,16.40 6.22,18.90
			 6.22,22.28 6.08,23.34 5.83,24.41
			 5.58,25.48 5.17,26.20 5.48,26.48
			 5.82,26.79 7.30,26.04 8.15,24.85
			 9.17,23.41 9.53,21.70 9.59,19.83
			 9.67,17.58 9.66,14.01 9.67,11.97
			 9.67,10.10 9.70,4.63 9.64,1.34
			 9.62,0.52 7.39,-0.32 6.33,0.12
			 6.33,0.12 6.33,0.12 6.33,0.12
			 6.33,0.12 6.33,0.12 6.33,0.12 Z
		 M 95.72,15.95
		 C 95.64,17.71 95.25,19.09 94.77,20.06
			 93.84,21.94 91.90,22.52 91.08,19.82
			 90.63,18.35 90.61,15.89 90.93,13.84
			 91.26,11.75 92.17,10.16 93.69,10.31
			 95.19,10.45 95.88,12.38 95.72,15.95
			 95.72,15.95 95.72,15.95 95.72,15.95
			 95.72,15.95 95.72,15.95 95.72,15.95 Z
		 M 70.53,26.87
		 C 70.51,29.79 70.05,32.35 69.07,33.09
			 67.68,34.15 65.79,33.35 66.18,31.22
			 66.52,29.34 68.16,27.41 70.53,25.06
			 70.53,25.06 70.54,25.59 70.53,26.87
			 70.53,26.87 70.53,26.87 70.53,26.87
			 70.53,26.87 70.53,26.87 70.53,26.87 Z
		 M 70.15,15.94
		 C 70.07,17.55 69.65,19.16 69.20,20.06
			 68.27,21.94 66.31,22.52 65.50,19.82
			 64.95,17.97 65.08,15.58 65.35,14.08
			 65.70,12.12 66.56,10.31 68.12,10.31
			 69.62,10.31 70.36,11.97 70.15,15.94
			 70.15,15.94 70.15,15.94 70.15,15.94
			 70.15,15.94 70.15,15.94 70.15,15.94 Z
		 M 55.55,15.91
		 C 55.46,17.61 55.13,19.03 54.60,20.06
			 53.64,21.93 51.75,22.52 50.91,19.82
			 50.31,17.88 50.51,15.23 50.76,13.80
			 51.13,11.67 52.06,10.17 53.52,10.31
			 55.01,10.46 55.74,12.38 55.55,15.91
			 55.55,15.91 55.55,15.91 55.55,15.91
			 55.55,15.91 55.55,15.91 55.55,15.91 Z
		 M 122.44,17.89
		 C 122.07,17.89 121.91,18.27 121.77,18.91
			 121.29,21.11 120.79,21.62 120.14,21.62
			 119.42,21.62 118.77,20.52 118.60,18.33
			 118.47,16.61 118.49,13.44 118.66,10.28
			 118.69,9.63 118.52,9.00 116.77,8.36
			 116.02,8.09 114.94,7.69 114.40,9.00
			 112.88,12.69 112.28,15.62 112.14,16.81
			 112.13,16.87 112.06,16.88 112.04,16.74
			 111.95,15.78 111.75,14.05 111.73,10.41
			 111.73,9.70 111.58,9.10 110.79,8.60
			 110.28,8.28 108.75,7.71 108.19,8.39
			 107.71,8.95 107.14,10.43 106.57,12.20
			 106.10,13.63 105.77,14.60 105.77,14.60
			 105.77,14.60 105.78,10.73 105.78,9.27
			 105.78,8.71 105.40,8.53 105.29,8.49
			 104.78,8.34 103.77,8.09 103.34,8.09
			 102.81,8.09 102.68,8.39 102.68,8.83
			 102.68,8.89 102.60,13.92 102.60,17.44
			 102.60,17.59 102.60,17.76 102.60,17.94
			 102.31,19.56 101.36,21.76 100.32,21.76
			 99.29,21.76 98.80,20.83 98.80,16.65
			 98.80,14.20 98.87,13.13 98.91,11.37
			 98.93,10.34 98.97,9.56 98.97,9.39
			 98.96,8.85 98.02,8.56 97.59,8.46
			 97.14,8.36 96.76,8.32 96.46,8.34
			 96.04,8.36 95.74,8.64 95.74,9.03
			 95.74,9.23 95.74,9.62 95.74,9.62
			 95.20,8.77 94.32,8.16 93.74,7.99
			 92.18,7.52 90.54,7.94 89.31,9.67
			 88.33,11.04 87.74,12.60 87.51,14.84
			 87.34,16.48 87.40,18.13 87.70,19.54
			 87.34,21.12 86.65,21.77 85.91,21.77
			 84.83,21.77 84.05,20.00 84.14,16.96
			 84.20,14.95 84.60,13.54 85.04,11.51
			 85.23,10.64 85.07,10.18 84.70,9.75
			 84.35,9.35 83.61,9.15 82.54,9.40
			 81.78,9.58 80.69,9.77 79.70,9.92
			 79.70,9.92 79.76,9.68 79.81,9.26
			 80.07,7.04 77.66,7.22 76.90,7.92
			 76.43,8.34 76.12,8.85 76.00,9.74
			 75.81,11.16 76.98,11.84 76.98,11.84
			 76.59,13.58 75.66,15.86 74.70,17.51
			 74.19,18.39 73.79,19.05 73.28,19.75
			 73.28,19.49 73.28,19.23 73.28,18.98
			 73.27,15.30 73.32,12.42 73.34,11.38
			 73.36,10.35 73.40,9.59 73.40,9.42
			 73.39,9.02 73.16,8.87 72.68,8.67
			 72.25,8.50 71.75,8.39 71.23,8.35
			 70.57,8.27 70.17,8.62 70.18,9.04
			 70.18,9.12 70.18,9.60 70.18,9.60
			 69.64,8.74 68.76,8.14 68.18,7.97
			 66.61,7.51 64.97,7.92 63.74,9.65
			 62.76,11.02 62.12,12.95 61.94,14.80
			 61.77,16.53 61.80,17.98 62.03,19.22
			 61.78,20.45 61.07,21.75 60.26,21.75
			 59.23,21.75 58.64,20.82 58.64,16.64
			 58.64,14.19 58.71,13.12 58.75,11.36
			 58.77,10.33 58.81,9.55 58.81,9.38
			 58.80,8.84 57.86,8.55 57.43,8.45
			 56.97,8.34 56.58,8.31 56.27,8.33
			 55.87,8.36 55.59,8.72 55.59,8.99
			 55.59,8.99 55.59,9.61 55.59,9.61
			 55.05,8.76 54.17,8.15 53.59,7.98
			 52.03,7.52 50.40,7.93 49.16,9.66
			 48.35,10.78 47.70,12.03 47.36,14.79
			 47.26,15.58 47.22,16.34 47.23,17.03
			 46.91,19.01 45.47,21.30 44.31,21.30
			 43.63,21.30 42.98,19.97 42.98,17.14
			 42.98,13.36 43.21,8.00 43.25,7.48
			 43.25,7.48 44.72,7.46 45.01,7.45
			 45.74,7.44 46.42,7.46 47.40,7.41
			 47.89,7.39 48.36,5.61 47.86,5.40
			 47.63,5.30 46.00,5.21 45.35,5.20
			 44.81,5.19 43.30,5.08 43.30,5.08
			 43.30,5.08 43.44,1.52 43.47,1.14
			 43.50,0.83 43.09,0.67 42.86,0.57
			 42.30,0.33 41.79,0.22 41.19,0.09
			 40.36,-0.08 39.99,0.09 39.92,0.78
			 39.81,1.85 39.75,4.96 39.75,4.96
			 39.14,4.96 37.07,4.84 36.47,4.84
			 35.91,4.84 35.29,7.27 36.08,7.30
			 36.98,7.33 38.54,7.36 39.57,7.40
			 39.57,7.40 39.52,12.86 39.52,14.54
			 39.52,14.72 39.52,14.89 39.52,15.06
			 38.95,18.04 36.94,19.65 36.94,19.65
			 37.37,17.68 36.49,16.19 34.89,14.94
			 34.31,14.48 33.15,13.60 31.86,12.64
			 31.86,12.64 32.61,11.90 33.27,10.41
			 33.74,9.36 33.76,8.15 32.61,7.88
			 30.71,7.44 29.13,8.85 28.67,10.34
			 28.31,11.51 28.50,12.37 29.21,13.26
			 29.26,13.32 29.32,13.39 29.38,13.46
			 28.95,14.30 28.36,15.41 27.86,16.29
			 26.47,18.69 25.41,20.60 24.62,20.60
			 23.99,20.60 23.99,18.66 23.99,16.85
			 23.99,15.28 24.10,12.93 24.20,10.50
			 24.23,9.70 23.83,9.24 23.16,8.83
			 22.75,8.57 21.88,8.07 21.38,8.07
			 20.62,8.07 18.45,8.17 16.39,14.16
			 16.13,14.91 15.62,16.29 15.62,16.29
			 15.62,16.29 15.66,9.10 15.66,9.10
			 15.66,8.93 15.57,8.77 15.36,8.65
			 15.01,8.46 14.09,8.08 13.26,8.08
			 12.87,8.08 12.67,8.26 12.67,8.63
			 12.67,8.63 12.58,19.88 12.58,19.88
			 12.58,20.73 12.60,21.73 12.69,22.17
			 12.77,22.60 12.91,22.96 13.08,23.17
			 13.25,23.38 13.44,23.54 13.76,23.61
			 14.06,23.67 15.70,23.89 15.79,23.26
			 15.89,22.51 15.90,21.70 16.75,18.66
			 18.08,13.95 19.83,11.65 20.64,10.83
			 20.78,10.69 20.95,10.68 20.94,10.91
			 20.90,11.95 20.78,14.53 20.70,16.73
			 20.48,22.60 21.54,23.69 23.06,23.69
			 24.22,23.69 25.87,22.53 27.63,19.60
			 28.73,17.77 29.79,15.97 30.56,14.68
			 31.09,15.17 31.69,15.70 32.29,16.28
			 33.68,17.60 34.14,18.86 33.83,20.05
			 33.60,20.96 32.73,21.90 31.18,20.98
			 30.73,20.71 30.53,20.51 30.08,20.21
			 29.84,20.05 29.46,20.00 29.24,20.17
			 28.66,20.61 28.33,21.17 28.14,21.86
			 27.96,22.53 28.63,22.89 29.32,23.20
			 29.92,23.47 31.21,23.71 32.03,23.74
			 35.23,23.86 37.81,22.19 39.60,17.91
			 39.92,21.61 41.28,23.70 43.65,23.70
			 45.23,23.70 46.83,21.66 47.52,19.64
			 47.72,20.46 48.01,21.17 48.39,21.78
			 50.21,24.68 53.75,24.06 55.52,21.59
			 56.07,20.82 56.15,20.55 56.15,20.55
			 56.42,22.87 58.28,23.68 59.35,23.68
			 60.55,23.68 61.78,23.12 62.64,21.16
			 62.74,21.38 62.85,21.58 62.97,21.77
			 64.79,24.67 68.34,24.04 70.11,21.58
			 70.19,21.47 70.27,21.36 70.33,21.27
			 70.33,21.27 70.38,22.79 70.38,22.79
			 70.38,22.79 69.37,23.72 68.75,24.30
			 66.00,26.82 63.92,28.73 63.77,30.95
			 63.57,33.80 65.87,34.85 67.61,34.99
			 69.45,35.14 71.03,34.12 72.00,32.68
			 72.85,31.43 73.41,28.71 73.37,26.03
			 73.35,24.96 73.33,23.60 73.31,22.14
			 74.27,21.01 75.35,19.60 76.35,17.94
			 77.45,16.13 78.61,13.70 79.21,11.82
			 79.21,11.82 80.22,11.83 81.30,11.76
			 81.65,11.74 81.75,11.81 81.68,12.06
			 81.60,12.37 80.32,17.35 81.49,20.67
			 82.29,22.94 84.11,23.67 85.18,23.67
			 86.44,23.67 87.65,22.72 88.30,21.31
			 88.38,21.47 88.46,21.62 88.55,21.76
			 90.37,24.66 93.89,24.03 95.68,21.57
			 96.08,21.01 96.31,20.53 96.31,20.53
			 96.69,22.94 98.57,23.68 99.63,23.68
			 100.74,23.68 101.80,23.22 102.65,21.19
			 102.69,22.09 102.74,22.82 102.83,23.05
			 102.88,23.19 103.20,23.37 103.43,23.45
			 104.45,23.84 105.48,23.65 105.87,23.57
			 106.14,23.52 106.34,23.30 106.37,22.75
			 106.44,21.30 106.40,18.86 106.84,17.05
			 107.58,14.01 108.27,12.82 108.60,12.24
			 108.78,11.91 108.99,11.86 109.00,12.20
			 109.02,12.90 109.05,14.96 109.33,17.72
			 109.54,19.76 109.82,20.95 110.03,21.34
			 110.64,22.42 111.40,22.47 112.02,22.47
			 112.41,22.47 113.23,22.36 113.16,21.67
			 113.12,21.33 113.19,19.25 113.91,16.24
			 114.38,14.29 115.17,12.52 115.46,11.88
			 115.57,11.64 115.61,11.83 115.61,11.87
			 115.55,13.21 115.42,17.62 115.96,20.03
			 116.70,23.29 118.86,23.66 119.60,23.66
			 121.19,23.66 122.50,22.45 122.94,19.24
			 123.07,18.49 122.91,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89 Z
		 M 122.44,17.89
		 C 122.44,17.89 122.44,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89 Z"
                    />
                </SvgIcon>
            </Box>
        )
    }
    return (
        <Box sx={{ margin: '30px auto 10px auto;', fontSize: '60px' }}>
            <SvgIcon
                fontSize="inherit"
                viewBox="25 0 80 35"
                sx={{ width: '100%' }}
            >
                <path
                    d="M 6.33,0.12
		 C 3.81,1.17 1.04,4.17 0.17,7.91
			 -0.94,12.66 3.67,14.67 4.04,14.01
			 4.48,13.23 3.21,12.97 2.95,10.50
			 2.62,7.33 4.10,3.78 5.96,2.22
			 6.30,1.93 6.29,2.33 6.29,3.08
			 6.29,4.42 6.22,16.40 6.22,18.90
			 6.22,22.28 6.08,23.34 5.83,24.41
			 5.58,25.48 5.17,26.20 5.48,26.48
			 5.82,26.79 7.30,26.04 8.15,24.85
			 9.17,23.41 9.53,21.70 9.59,19.83
			 9.67,17.58 9.66,14.01 9.67,11.97
			 9.67,10.10 9.70,4.63 9.64,1.34
			 9.62,0.52 7.39,-0.32 6.33,0.12
			 6.33,0.12 6.33,0.12 6.33,0.12
			 6.33,0.12 6.33,0.12 6.33,0.12 Z
		 M 95.72,15.95
		 C 95.64,17.71 95.25,19.09 94.77,20.06
			 93.84,21.94 91.90,22.52 91.08,19.82
			 90.63,18.35 90.61,15.89 90.93,13.84
			 91.26,11.75 92.17,10.16 93.69,10.31
			 95.19,10.45 95.88,12.38 95.72,15.95
			 95.72,15.95 95.72,15.95 95.72,15.95
			 95.72,15.95 95.72,15.95 95.72,15.95 Z
		 M 70.53,26.87
		 C 70.51,29.79 70.05,32.35 69.07,33.09
			 67.68,34.15 65.79,33.35 66.18,31.22
			 66.52,29.34 68.16,27.41 70.53,25.06
			 70.53,25.06 70.54,25.59 70.53,26.87
			 70.53,26.87 70.53,26.87 70.53,26.87
			 70.53,26.87 70.53,26.87 70.53,26.87 Z
		 M 70.15,15.94
		 C 70.07,17.55 69.65,19.16 69.20,20.06
			 68.27,21.94 66.31,22.52 65.50,19.82
			 64.95,17.97 65.08,15.58 65.35,14.08
			 65.70,12.12 66.56,10.31 68.12,10.31
			 69.62,10.31 70.36,11.97 70.15,15.94
			 70.15,15.94 70.15,15.94 70.15,15.94
			 70.15,15.94 70.15,15.94 70.15,15.94 Z
		 M 55.55,15.91
		 C 55.46,17.61 55.13,19.03 54.60,20.06
			 53.64,21.93 51.75,22.52 50.91,19.82
			 50.31,17.88 50.51,15.23 50.76,13.80
			 51.13,11.67 52.06,10.17 53.52,10.31
			 55.01,10.46 55.74,12.38 55.55,15.91
			 55.55,15.91 55.55,15.91 55.55,15.91
			 55.55,15.91 55.55,15.91 55.55,15.91 Z
		 M 122.44,17.89
		 C 122.07,17.89 121.91,18.27 121.77,18.91
			 121.29,21.11 120.79,21.62 120.14,21.62
			 119.42,21.62 118.77,20.52 118.60,18.33
			 118.47,16.61 118.49,13.44 118.66,10.28
			 118.69,9.63 118.52,9.00 116.77,8.36
			 116.02,8.09 114.94,7.69 114.40,9.00
			 112.88,12.69 112.28,15.62 112.14,16.81
			 112.13,16.87 112.06,16.88 112.04,16.74
			 111.95,15.78 111.75,14.05 111.73,10.41
			 111.73,9.70 111.58,9.10 110.79,8.60
			 110.28,8.28 108.75,7.71 108.19,8.39
			 107.71,8.95 107.14,10.43 106.57,12.20
			 106.10,13.63 105.77,14.60 105.77,14.60
			 105.77,14.60 105.78,10.73 105.78,9.27
			 105.78,8.71 105.40,8.53 105.29,8.49
			 104.78,8.34 103.77,8.09 103.34,8.09
			 102.81,8.09 102.68,8.39 102.68,8.83
			 102.68,8.89 102.60,13.92 102.60,17.44
			 102.60,17.59 102.60,17.76 102.60,17.94
			 102.31,19.56 101.36,21.76 100.32,21.76
			 99.29,21.76 98.80,20.83 98.80,16.65
			 98.80,14.20 98.87,13.13 98.91,11.37
			 98.93,10.34 98.97,9.56 98.97,9.39
			 98.96,8.85 98.02,8.56 97.59,8.46
			 97.14,8.36 96.76,8.32 96.46,8.34
			 96.04,8.36 95.74,8.64 95.74,9.03
			 95.74,9.23 95.74,9.62 95.74,9.62
			 95.20,8.77 94.32,8.16 93.74,7.99
			 92.18,7.52 90.54,7.94 89.31,9.67
			 88.33,11.04 87.74,12.60 87.51,14.84
			 87.34,16.48 87.40,18.13 87.70,19.54
			 87.34,21.12 86.65,21.77 85.91,21.77
			 84.83,21.77 84.05,20.00 84.14,16.96
			 84.20,14.95 84.60,13.54 85.04,11.51
			 85.23,10.64 85.07,10.18 84.70,9.75
			 84.35,9.35 83.61,9.15 82.54,9.40
			 81.78,9.58 80.69,9.77 79.70,9.92
			 79.70,9.92 79.76,9.68 79.81,9.26
			 80.07,7.04 77.66,7.22 76.90,7.92
			 76.43,8.34 76.12,8.85 76.00,9.74
			 75.81,11.16 76.98,11.84 76.98,11.84
			 76.59,13.58 75.66,15.86 74.70,17.51
			 74.19,18.39 73.79,19.05 73.28,19.75
			 73.28,19.49 73.28,19.23 73.28,18.98
			 73.27,15.30 73.32,12.42 73.34,11.38
			 73.36,10.35 73.40,9.59 73.40,9.42
			 73.39,9.02 73.16,8.87 72.68,8.67
			 72.25,8.50 71.75,8.39 71.23,8.35
			 70.57,8.27 70.17,8.62 70.18,9.04
			 70.18,9.12 70.18,9.60 70.18,9.60
			 69.64,8.74 68.76,8.14 68.18,7.97
			 66.61,7.51 64.97,7.92 63.74,9.65
			 62.76,11.02 62.12,12.95 61.94,14.80
			 61.77,16.53 61.80,17.98 62.03,19.22
			 61.78,20.45 61.07,21.75 60.26,21.75
			 59.23,21.75 58.64,20.82 58.64,16.64
			 58.64,14.19 58.71,13.12 58.75,11.36
			 58.77,10.33 58.81,9.55 58.81,9.38
			 58.80,8.84 57.86,8.55 57.43,8.45
			 56.97,8.34 56.58,8.31 56.27,8.33
			 55.87,8.36 55.59,8.72 55.59,8.99
			 55.59,8.99 55.59,9.61 55.59,9.61
			 55.05,8.76 54.17,8.15 53.59,7.98
			 52.03,7.52 50.40,7.93 49.16,9.66
			 48.35,10.78 47.70,12.03 47.36,14.79
			 47.26,15.58 47.22,16.34 47.23,17.03
			 46.91,19.01 45.47,21.30 44.31,21.30
			 43.63,21.30 42.98,19.97 42.98,17.14
			 42.98,13.36 43.21,8.00 43.25,7.48
			 43.25,7.48 44.72,7.46 45.01,7.45
			 45.74,7.44 46.42,7.46 47.40,7.41
			 47.89,7.39 48.36,5.61 47.86,5.40
			 47.63,5.30 46.00,5.21 45.35,5.20
			 44.81,5.19 43.30,5.08 43.30,5.08
			 43.30,5.08 43.44,1.52 43.47,1.14
			 43.50,0.83 43.09,0.67 42.86,0.57
			 42.30,0.33 41.79,0.22 41.19,0.09
			 40.36,-0.08 39.99,0.09 39.92,0.78
			 39.81,1.85 39.75,4.96 39.75,4.96
			 39.14,4.96 37.07,4.84 36.47,4.84
			 35.91,4.84 35.29,7.27 36.08,7.30
			 36.98,7.33 38.54,7.36 39.57,7.40
			 39.57,7.40 39.52,12.86 39.52,14.54
			 39.52,14.72 39.52,14.89 39.52,15.06
			 38.95,18.04 36.94,19.65 36.94,19.65
			 37.37,17.68 36.49,16.19 34.89,14.94
			 34.31,14.48 33.15,13.60 31.86,12.64
			 31.86,12.64 32.61,11.90 33.27,10.41
			 33.74,9.36 33.76,8.15 32.61,7.88
			 30.71,7.44 29.13,8.85 28.67,10.34
			 28.31,11.51 28.50,12.37 29.21,13.26
			 29.26,13.32 29.32,13.39 29.38,13.46
			 28.95,14.30 28.36,15.41 27.86,16.29
			 26.47,18.69 25.41,20.60 24.62,20.60
			 23.99,20.60 23.99,18.66 23.99,16.85
			 23.99,15.28 24.10,12.93 24.20,10.50
			 24.23,9.70 23.83,9.24 23.16,8.83
			 22.75,8.57 21.88,8.07 21.38,8.07
			 20.62,8.07 18.45,8.17 16.39,14.16
			 16.13,14.91 15.62,16.29 15.62,16.29
			 15.62,16.29 15.66,9.10 15.66,9.10
			 15.66,8.93 15.57,8.77 15.36,8.65
			 15.01,8.46 14.09,8.08 13.26,8.08
			 12.87,8.08 12.67,8.26 12.67,8.63
			 12.67,8.63 12.58,19.88 12.58,19.88
			 12.58,20.73 12.60,21.73 12.69,22.17
			 12.77,22.60 12.91,22.96 13.08,23.17
			 13.25,23.38 13.44,23.54 13.76,23.61
			 14.06,23.67 15.70,23.89 15.79,23.26
			 15.89,22.51 15.90,21.70 16.75,18.66
			 18.08,13.95 19.83,11.65 20.64,10.83
			 20.78,10.69 20.95,10.68 20.94,10.91
			 20.90,11.95 20.78,14.53 20.70,16.73
			 20.48,22.60 21.54,23.69 23.06,23.69
			 24.22,23.69 25.87,22.53 27.63,19.60
			 28.73,17.77 29.79,15.97 30.56,14.68
			 31.09,15.17 31.69,15.70 32.29,16.28
			 33.68,17.60 34.14,18.86 33.83,20.05
			 33.60,20.96 32.73,21.90 31.18,20.98
			 30.73,20.71 30.53,20.51 30.08,20.21
			 29.84,20.05 29.46,20.00 29.24,20.17
			 28.66,20.61 28.33,21.17 28.14,21.86
			 27.96,22.53 28.63,22.89 29.32,23.20
			 29.92,23.47 31.21,23.71 32.03,23.74
			 35.23,23.86 37.81,22.19 39.60,17.91
			 39.92,21.61 41.28,23.70 43.65,23.70
			 45.23,23.70 46.83,21.66 47.52,19.64
			 47.72,20.46 48.01,21.17 48.39,21.78
			 50.21,24.68 53.75,24.06 55.52,21.59
			 56.07,20.82 56.15,20.55 56.15,20.55
			 56.42,22.87 58.28,23.68 59.35,23.68
			 60.55,23.68 61.78,23.12 62.64,21.16
			 62.74,21.38 62.85,21.58 62.97,21.77
			 64.79,24.67 68.34,24.04 70.11,21.58
			 70.19,21.47 70.27,21.36 70.33,21.27
			 70.33,21.27 70.38,22.79 70.38,22.79
			 70.38,22.79 69.37,23.72 68.75,24.30
			 66.00,26.82 63.92,28.73 63.77,30.95
			 63.57,33.80 65.87,34.85 67.61,34.99
			 69.45,35.14 71.03,34.12 72.00,32.68
			 72.85,31.43 73.41,28.71 73.37,26.03
			 73.35,24.96 73.33,23.60 73.31,22.14
			 74.27,21.01 75.35,19.60 76.35,17.94
			 77.45,16.13 78.61,13.70 79.21,11.82
			 79.21,11.82 80.22,11.83 81.30,11.76
			 81.65,11.74 81.75,11.81 81.68,12.06
			 81.60,12.37 80.32,17.35 81.49,20.67
			 82.29,22.94 84.11,23.67 85.18,23.67
			 86.44,23.67 87.65,22.72 88.30,21.31
			 88.38,21.47 88.46,21.62 88.55,21.76
			 90.37,24.66 93.89,24.03 95.68,21.57
			 96.08,21.01 96.31,20.53 96.31,20.53
			 96.69,22.94 98.57,23.68 99.63,23.68
			 100.74,23.68 101.80,23.22 102.65,21.19
			 102.69,22.09 102.74,22.82 102.83,23.05
			 102.88,23.19 103.20,23.37 103.43,23.45
			 104.45,23.84 105.48,23.65 105.87,23.57
			 106.14,23.52 106.34,23.30 106.37,22.75
			 106.44,21.30 106.40,18.86 106.84,17.05
			 107.58,14.01 108.27,12.82 108.60,12.24
			 108.78,11.91 108.99,11.86 109.00,12.20
			 109.02,12.90 109.05,14.96 109.33,17.72
			 109.54,19.76 109.82,20.95 110.03,21.34
			 110.64,22.42 111.40,22.47 112.02,22.47
			 112.41,22.47 113.23,22.36 113.16,21.67
			 113.12,21.33 113.19,19.25 113.91,16.24
			 114.38,14.29 115.17,12.52 115.46,11.88
			 115.57,11.64 115.61,11.83 115.61,11.87
			 115.55,13.21 115.42,17.62 115.96,20.03
			 116.70,23.29 118.86,23.66 119.60,23.66
			 121.19,23.66 122.50,22.45 122.94,19.24
			 123.07,18.49 122.91,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89 Z
		 M 122.44,17.89
		 C 122.44,17.89 122.44,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89
			 122.44,17.89 122.44,17.89 122.44,17.89 Z"
                />
            </SvgIcon>
        </Box>
    )
}

export default InstagramLogo