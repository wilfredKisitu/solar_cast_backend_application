import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateDiagnosis } from './diagnosis-interface/create-diagnosis';
import { PythonShell } from 'python-shell';
import { User } from 'src/Entities/user.entity';
import { Forecast } from 'src/Entities/forecast.entity';



@Injectable()
export class ForecastService {
    constructor(
        @InjectRepository(Forecast) 
        private readonly forecastRepository: Repository<Forecast>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ){}

    // get Diagnosis by ID 
    async getForecastByUserId(userId: number): Promise<Forecast[]> {
        const diagnoses = await this.forecastRepository.find({
          where: { user: { id: userId } },
          order: { createdAt: 'DESC' }, 
        });
    
        if (!diagnoses || diagnoses.length === 0) {
          throw new NotFoundException(`No diagnoses found for user with ID ${userId}`);
        }
        return diagnoses;
      }
    
    // create Diagnosis
    async createDiagnosis(icreateDiagnosis: ICreateDiagnosis,) {
        const { userId, ...diagnosisData } = icreateDiagnosis;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
    
        const inputData = Object.values({...diagnosisData });
        const prediction = await this.runPythonModel(inputData);
    
        const diagnosis = this.forecastRepository.create({
            ...diagnosisData,
            prediction,
            user: { id: userId },
        });
    
        return this.forecastRepository.save(diagnosis);
    }
    

    private async runPythonModel(inputData: number[]): Promise<string>{
        const options = {
            //mode: 'text',
            pythonPath:"C:\\Users\\USER\\xgboost_env\\Scripts\\python.exe",
            pythonOptions: ['-u'],
            scriptPath: './src/diagnose/model-predictions',
            args: inputData.map(String)
        }
        try {
            const results = await PythonShell.run('predict.py', options);
            if(!results || results.length == 0) {
                throw new Error('Python Script returned no results');
            }
            return results[0];

        } catch(err) {
            console.log('Error running python script');
            throw err
        }
    }
}
