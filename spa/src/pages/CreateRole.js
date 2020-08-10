import React, {useEffect} from 'react'

const CreateRole = ({
                        onShift = () => {
                        }
                    }) => {

    useEffect(() => {
        onShift('create')
    }, [])

    return (
        <div>
            <h3>CreateUser</h3>
            <button onClick={() => onShift(null)}>Cancel</button>

            <table className="table_detail_role">
                <tbody>
                <tr>
                    <td><strong>cachePerms</strong></td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <nobr>for all classes</nobr>
                                </td>
                                <td>
                                    <label>CACHE_READ</label>
                                    <label>CACHE_PUT</label>
                                    <label>CACHE_REMOVE</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><strong>taskPerms</strong></td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <nobr>com.sbt.security.ignite.core.storage.metastorage.administration.query.UserGetPermissionsTask</nobr>
                                </td>
                                <td>
                                    <label>TASK_EXECUTE</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <nobr>org.apache.ignite.internal.commandline.cache.distribution.CacheDistributionTask</nobr>
                                </td>
                                <td>
                                    <label>TASK_EXECUTE</label>
                                    <label>CACHE_READ</label>
                                    <label>CACHE_PUT</label>
                                    <label>CACHE_REMOVE</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <nobr>com.sbt.security.ignite.core.storage.metastorage.administration.query.UserUpdatePasswordTask</nobr>
                                </td>
                                <td>
                                    <label>TASK_EXECUTE</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <nobr>org.apache.ignite.internal.commandline.cache.reset_lost_partitions.CacheResetLostPartitionsTask</nobr>
                                </td>
                                <td>
                                    <label>TASK_EXECUTE</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <nobr>org.apache.ignite.internal.processors.cache.verify.VerifyBackupPartitionsTaskV2</nobr>
                                </td>
                                <td>
                                    <label>TASK_EXECUTE</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><strong>servicePerms</strong></td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <nobr>for all classes</nobr>
                                </td>
                                <td>
                                    <label>SERVICE_DEPLOY</label>
                                    <label>SERVICE_CANCEL</label>
                                    <label>SERVICE_INVOKE</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><strong>systemPerms</strong></td>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <nobr>for all classes</nobr>
                                </td>
                                <td>
                                    <label>JOIN_AS_SERVER</label>
                                    <label>CACHE_CREATE</label>
                                    <label>ADMIN_CACHE</label>
                                    <label>CACHE_DESTROY</label>
                                    <label>ADMIN_OPS</label>
                                    <label>ADMIN_VIEW</label>
                                    <label>ADMIN_QUERY</label>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CreateRole