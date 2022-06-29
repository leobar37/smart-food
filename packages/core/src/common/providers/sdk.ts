import { Client} from '@smartfood/client';
import { FactoryProvider , Inject} from '@nestjs/common'
import { ConfigService} from '@nestjs/config'
export const sdkProvider : FactoryProvider<Client> = {
    provide: 'SDK',
    useFactory: (configService : ConfigService) => {
        const url = configService.get('SDK_ENDPOINT');
        return new Client({
            endpoint  : url
        });
    },
    inject : [ConfigService]
}

export const InjectSdk =() => Inject('SDK')
