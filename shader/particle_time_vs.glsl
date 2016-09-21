//##FilterBegin## ##Particle##


// 按秒为单位
//x : bornTime
//y : life
//z : index
attribute vec3 attribute_time ;

//按秒为单位
//当前时间
float currentTime = 0.0;

varying vec3 varying_particleData;
struct ParticleData{
	float bornTime;			//出生时间(加过rate，但是没有加delay)
	float life;				//单次生命周期时间
	float index;			//下标
};                   



float particle( ParticleData curParticle ){
	//扣除延迟时间
	float time = particleStateData.time - particleStateData.delay;
	//还未出生
	currentTime = time - curParticle.bornTime;
	if(currentTime <= 0.0){
		return currentTime = 0.0;
	}
	if(particleStateData.loop < TrueOrFalse){
		//还没到出生时间，发射器已经死亡
		if(curParticle.bornTime >= particleStateData.duration){
			return currentTime = 0.0;
		}
		//单个粒子本身的生命周期已经结束
		if(time >= curParticle.life + curParticle.bornTime){
			return currentTime = 0.0;
		}
	}

	//计算当前粒子在单次循环中的相对时间
	currentTime = mod(currentTime, particleStateData.loopTime);
	//当前loopTime内超过粒子自身的什么周期，死亡状态
	if(currentTime >= curParticle.life){
		return currentTime = 0.0;
	}
	if( currentTime <= 0.0 ) 
		return currentTime = 0.0;
}


void main(void) {
	
	ParticleData curParticle ;
	curParticle.bornTime = attribute_time.x ; 
	curParticle.life = attribute_time.y ; 
	curParticle.index = attribute_time.z ; 
	
	float active = particle( curParticle ) ;
	
	varying_particleData.x = currentTime;
	varying_particleData.y = curParticle.life ;
	varying_particleData.z = curParticle.index;
	
	if( active < TrueOrFalse ){
		e_discard();
	}else{
		
	}
	


}


//##FilterEnd##
