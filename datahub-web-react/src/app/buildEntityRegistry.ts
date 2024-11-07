import EntityRegistry from './entity/EntityRegistry';
import { DashboardEntity } from './entity/dashboard/DashboardEntity';
import { ChartEntity } from './entity/chart/ChartEntity';
import { UserEntity } from './entity/user/User';
import { GroupEntity } from './entity/group/Group';
import { DatasetEntity } from './entity/dataset/DatasetEntity';
import { DataFlowEntity } from './entity/dataFlow/DataFlowEntity';
import { DataJobEntity } from './entity/dataJob/DataJobEntity';
import { TagEntity } from './entity/tag/Tag';
import { GlossaryTermEntity } from './entity/glossaryTerm/GlossaryTermEntity';
import { MLFeatureEntity } from './entity/mlFeature/MLFeatureEntity';
import { MLPrimaryKeyEntity } from './entity/mlPrimaryKey/MLPrimaryKeyEntity';
import { MLFeatureTableEntity } from './entity/mlFeatureTable/MLFeatureTableEntity';
import { MLModelEntity } from './entity/mlModel/MLModelEntity';
import { MLModelGroupEntity } from './entity/mlModelGroup/MLModelGroupEntity';
import { DomainEntity } from './entity/domain/DomainEntity';
import { ContainerEntity } from './entity/container/ContainerEntity';
import GlossaryNodeEntity from './entity/glossaryNode/GlossaryNodeEntity';
import { DataPlatformEntity } from './entity/dataPlatform/DataPlatformEntity';
import { DataProductEntity } from './entity/dataProduct/DataProductEntity';
import { DataPlatformInstanceEntity } from './entity/dataPlatformInstance/DataPlatformInstanceEntity';
import { ERModelRelationshipEntity } from './entity/ermodelrelationships/ERModelRelationshipEntity';
import { RoleEntity } from './entity/Access/RoleEntity';
import { RestrictedEntity } from './entity/restricted/RestrictedEntity';
import { BusinessAttributeEntity } from './entity/businessAttribute/BusinessAttributeEntity';
import { SchemaFieldPropertiesEntity } from './entity/schemaField/SchemaFieldPropertiesEntity';

export default function buildEntityRegistry(t: any) {
    const registry = new EntityRegistry();
    registry.register(new DatasetEntity(t));
    registry.register(new DashboardEntity(t));
    registry.register(new ChartEntity(t));
    registry.register(new UserEntity(t));
    registry.register(new GroupEntity(t));
    registry.register(new TagEntity());
    registry.register(new DataFlowEntity(t));
    registry.register(new DataJobEntity(t));
    registry.register(new GlossaryTermEntity(t));
    registry.register(new MLFeatureEntity(t));
    registry.register(new MLPrimaryKeyEntity());
    registry.register(new MLFeatureTableEntity(t));
    registry.register(new MLModelEntity());
    registry.register(new MLModelGroupEntity(t));
    registry.register(new DomainEntity(t));
    registry.register(new ContainerEntity(t));
    registry.register(new GlossaryNodeEntity(t));
    registry.register(new RoleEntity(t));
    registry.register(new DataPlatformEntity());
    registry.register(new DataProductEntity(t));
    registry.register(new DataPlatformInstanceEntity());
    registry.register(new ERModelRelationshipEntity());
    registry.register(new BusinessAttributeEntity());
    registry.register(new SchemaFieldPropertiesEntity());
    registry.register(new ERModelRelationshipEntity());
    registry.register(new RestrictedEntity(t));
    return registry;
}
