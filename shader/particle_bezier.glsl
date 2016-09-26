//##FilterBegin## ##Particle##
const float Tiny = 0.0001;
float calcBezierArea(float bzData[35], float tCurrent, float tTotal){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float a_deltaTime;

	float segmentCount = bzData[34] - 1.0;//最后一个点不需要记录，如9个点只有8条线段
	float iFloat = 0.0;
	for(int i = 0; i < 16; i ++)
	{
		iFloat = float(i);
		if(iFloat - segmentCount > Tiny)
			break;
		v0 = bzData[i * 2 + 1];
		t0 = bzData[i * 2 + 2] * tTotal;
		v1 = bzData[i * 2 + 3];
		t1 = bzData[i * 2 + 4] * tTotal;

		deltaTime = t1 - t0;

		if(deltaTime > Tiny)
		{
			a_deltaTime = 0.5 * (v1 - v0);
			if(tCurrent >= t1)
			{
				res += deltaTime * (v0 + a_deltaTime);
			}else
			{
				deltaTime = tCurrent - t0;
				res += deltaTime * (v0 + a_deltaTime);
				break;
			}
		}

	}

	return res;
}


float calcBezierSize(float bzData[35], float tCurrent, float tTotal){
	float res = 0.0;

	float y0;
	float y1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float v;
	float segmentCount = bzData[34] - 1.0;//最后一个点不需要记录，如9个点只有8条线段
	float iFloat = 0.0;

	for(int i = 0; i < 16; i ++)
	{
		iFloat = float(i);
		if(iFloat - segmentCount > Tiny)
			break;
		y0 = bzData[i * 2 + 1];
		t0 = bzData[i * 2 + 2] * tTotal;
		y1 = bzData[i * 2 + 3];
		t1 = bzData[i * 2 + 4] * tTotal;

		deltaTime = t1 - t0;

		if(deltaTime > Tiny)
		{
			if(tCurrent <= t1)
			{
				v = (y1 - y0) / deltaTime;
				deltaTime = tCurrent - t0;
				res = y0 + v * deltaTime;
				break;
			}
		}

	}

	return res;
}

//##FilterEnd##
