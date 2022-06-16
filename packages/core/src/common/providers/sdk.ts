import { Client} from '@smartfood/client';
import { FactoryProvider , Inject} from '@nestjs/common'

export const sdkProvider : FactoryProvider<Client> = {
    provide: 'SDK',
    useFactory: () => {
        return new Client({
            endpoint  : process.env.SDK_ENDPOINT|| "http://localhost:5000/api/graphql",
        });
    },
}

export const InjectSdk =() => Inject('SDK')
