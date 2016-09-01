//##FilterBegin## ##Particle##
vec2 bzData[20];
const float Tiny = 0.0001;
void dcpBezier(float bezierData[22], float tTotal) 
{ 
	float timeNow = 0.0; 
	float time1 = bezierData[20] * tTotal; 
	float time2 = bezierData[21] * tTotal; 
	for(int i = 0; i < 20; i ++){ 
		bzData[i].x = timeNow; 
		bzData[i].y = bezierData[i]; 
		if(i <= 9){ 
			timeNow += time1; 
		}else if(i >= 11){ 
			timeNow += time2; 
		} 
	} 
	bzData[10].x = bzData[9].x;
}


float calcBezierArea(float tCurrent){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float a_deltaTime;


	for(int i = 0; i < 19; i ++){
		v0 = bzData[i].y;
		v1 = bzData[i + 1].y;
		t0 = bzData[i].x;
		t1 = bzData[i + 1].x;
		deltaTime = t1 - t0;
		if(deltaTime > Tiny)
		{
			a_deltaTime = 0.5 * (v1 - v0);
			if(tCurrent >= t1){
				res += deltaTime * (v0 + a_deltaTime);
			}else{
				deltaTime = tCurrent - t0;
				res += deltaTime * (v0 + a_deltaTime);
				break;
			}
		}

	}

	return res;
}




float calcOneBezierArea(float bezierData[22], float tCurrent, float tTotal){
	dcpBezier(bezierData, tTotal);
	return calcBezierArea(tCurrent);
}




float calcBezierSize(float tCurrent){
	float res = 0.0;

	float y0;
	float y1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float v;

	for(int i = 0; i < 19; i ++){
		y0 = bzData[i].y;
		y1 = bzData[i + 1].y;
		t0 = bzData[i].x;
		t1 = bzData[i + 1].x;
		deltaTime = t1 - t0;
		if(deltaTime > Tiny)
		{
			if(tCurrent <= t1){
				v = (y1 - y0) / deltaTime;
				deltaTime = tCurrent - t0;
				res = y0 + v * deltaTime;
				break;
			}
		}

	}

	return res;
}


float calcOneBezierSize(float bezierData[22], float tCurrent, float tTotal){
	dcpBezier(bezierData, tTotal);
	return calcBezierSize(tCurrent);
}
//##FilterEnd##
