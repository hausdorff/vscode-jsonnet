export const coreFile = `{
  local apiVersion = {apiVersion: "apps/v1beta1"},
  local defaultMetadata(name, namespace) = {metadata: $.v1.objectMeta.name(name) + $.v1.objectMeta.namespace(namespace)},
  types:: {
    uID:: {
    },
    unixGroupID:: {
    },
    unixUserID:: {
    },
  },
  v1:: {
    aPIResource:: {
      local kind = {kind: "APIResource"},
      default(name, singularName, namespaced, kind, verbs)::
        kind +
      {
        name: name,
        singularName: singularName,
        namespaced: namespaced,
        kind: kind,
        verbs: verbs,
        shortNames: [],
      },
      // name is the plural name of the resource.
      name(name):: {name: name},
      // namespaced indicates if a resource is namespaced or not.
      namespaced(namespaced):: {namespaced: namespaced},
      // shortNames is a list of suggested short names of the resource.
      shortNames(shortNames):: if std.type(shortNames) == "array" then {shortNames+: shortNames} else {shortNames+: [shortNames]},
      // singularName is the singular name of the resource.  This allows clients to handle plural and singular opaquely. The singularName is more correct for reporting status on a single item and both singular and plural are allowed from the kubectl CLI interface.
      singularName(singularName):: {singularName: singularName},
      // verbs is a list of supported kube verbs (this includes get, list, watch, create, update, patch, delete, deletecollection, and proxy)
      verbs(verbs):: if std.type(verbs) == "array" then {verbs+: verbs} else {verbs+: [verbs]},
    },
    aPIResourceList:: {
      local kind = {kind: "APIResourceList"},
      default(groupVersion, resources)::
        apiVersion +
        kind +
      {
        resources: resources,
        groupVersion: groupVersion,
      },
      // groupVersion is the group and version this APIResourceList is for.
      groupVersion(groupVersion):: {groupVersion: groupVersion},
      // resources contains the name of the resources and if they are namespaced.
      resources(resources):: if std.type(resources) == "array" then {resources+: resources} else {resources+: [resources]},
    },
    aWSElasticBlockStoreVolumeSource:: {
      default(volumeID)::
      {
        volumeID: volumeID,
      },
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      fsType(fsType):: {fsType: fsType},
      // The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
      partition(partition):: {partition: partition},
      // Specify "true" to force and set the ReadOnly property in VolumeMounts to "true". If omitted, the default is "false". More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      readOnly(readOnly):: {readOnly: readOnly},
      // Unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      volumeID(volumeID):: {volumeID: volumeID},
    },
    affinity:: {
      default()::
      {
        nodeAffinity: {},
        podAffinity: {},
        podAntiAffinity: {},
      },
      // Describes node affinity scheduling rules for the pod.
      nodeAffinity(nodeAffinity):: {nodeAffinity+: nodeAffinity},
      // Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
      podAffinity(podAffinity):: {podAffinity+: podAffinity},
      // Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
      podAntiAffinity(podAntiAffinity):: {podAntiAffinity+: podAntiAffinity},
      mixin:: {
        podAffinity:: {
          local podAffinity(mixin) = {podAffinity+: mixin},
          requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: podAffinity($.v1.podAffinity.requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution)),
          preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: podAffinity($.v1.podAffinity.preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution)),
        },
        podAntiAffinity:: {
          local podAntiAffinity(mixin) = {podAntiAffinity+: mixin},
          preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: podAntiAffinity($.v1.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution)),
          requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: podAntiAffinity($.v1.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution)),
        },
        nodeAffinity:: {
          local nodeAffinity(mixin) = {nodeAffinity+: mixin},
          requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: nodeAffinity($.v1.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution)),
          preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: nodeAffinity($.v1.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution)),
        },
      },
    },
    azureDataDiskCachingMode:: {
    },
    azureDataDiskKind:: {
    },
    azureDiskVolumeSource:: {
      local kind = {kind: "AzureDiskVolumeSource"},
      default(diskName, diskURI)::
        kind +
      {
        cachingMode: {},
        kind: {},
        diskName: diskName,
        diskURI: diskURI,
      },
      // Host Caching mode: None, Read Only, Read Write.
      cachingMode(cachingMode):: {cachingMode+: cachingMode},
      // The Name of the data disk in the blob storage
      diskName(diskName):: {diskName: diskName},
      // The URI the data disk in the blob storage
      diskURI(diskURI):: {diskURI: diskURI},
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
    },
    azureFileVolumeSource:: {
      default(secretName, shareName)::
      {
        secretName: secretName,
        shareName: shareName,
      },
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // the name of secret that contains Azure Storage Account Name and Key
      secretName(secretName):: {secretName: secretName},
      // Share Name
      shareName(shareName):: {shareName: shareName},
    },
    capabilities:: {
      default()::
      {
        add: [],
        drop: [],
      },
      // Added capabilities
      add(add):: if std.type(add) == "array" then {add+: add} else {add+: [add]},
      // Removed capabilities
      drop(drop):: if std.type(drop) == "array" then {drop+: drop} else {drop+: [drop]},
    },
    capability:: {
    },
    cephFSVolumeSource:: {
      default(monitors)::
      {
        secretRef: {},
        monitors: monitors,
      },
      // Required: Monitors is a collection of Ceph monitors More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      monitors(monitors):: if std.type(monitors) == "array" then {monitors+: monitors} else {monitors+: [monitors]},
      // Optional: Used as the mounted root, rather than the full Ceph tree, default is /
      path(path):: {path: path},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      readOnly(readOnly):: {readOnly: readOnly},
      // Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      secretFile(secretFile):: {secretFile: secretFile},
      // Optional: SecretRef is reference to the authentication secret for User, default is empty. More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      secretRef(secretRef):: {secretRef+: secretRef},
      // Optional: User is the rados user name, default is admin More info: https://releases.k8s.io/HEAD/examples/volumes/cephfs/README.md#how-to-use-it
      user(user):: {user: user},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    cinderVolumeSource:: {
      default(volumeID)::
      {
        volumeID: volumeID,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      fsType(fsType):: {fsType: fsType},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      readOnly(readOnly):: {readOnly: readOnly},
      // volume id used to identify the volume in cinder More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      volumeID(volumeID):: {volumeID: volumeID},
    },
    configMapEnvSource:: {
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap must be defined
      optional(optional):: {optional: optional},
    },
    configMapKeySelector:: {
      default(key)::
      {
        key: key,
      },
      // The key to select.
      key(key):: {key: key},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap or it's key must be defined
      optional(optional):: {optional: optional},
    },
    configMapProjection:: {
      default()::
      {
        items: [],
      },
      // If unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap or it's keys must be defined
      optional(optional):: {optional: optional},
    },
    configMapVolumeSource:: {
      default()::
      {
        items: [],
      },
      // Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // If unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the ConfigMap or it's keys must be defined
      optional(optional):: {optional: optional},
    },
    container:: {
      default(name)::
      {
        livenessProbe: {},
        volumeMounts: [],
        envFrom: [],
        securityContext: {},
        lifecycle: {},
        ports: [],
        resources: {},
        args: [],
        env: [],
        readinessProbe: {},
        command: [],
        name: name,
      },
      // Arguments to the entrypoint. The docker image's CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
      args(args):: if std.type(args) == "array" then {args+: args} else {args+: [args]},
      // Entrypoint array. Not executed within a shell. The docker image's ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container's environment. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
      command(command):: if std.type(command) == "array" then {command+: command} else {command+: [command]},
      // List of environment variables to set in the container. Cannot be updated.
      env(env):: if std.type(env) == "array" then {env+: env} else {env+: [env]},
      // List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.
      envFrom(envFrom):: if std.type(envFrom) == "array" then {envFrom+: envFrom} else {envFrom+: [envFrom]},
      // Docker image name. More info: https://kubernetes.io/docs/concepts/containers/images
      image(image):: {image: image},
      // Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
      imagePullPolicy(imagePullPolicy):: {imagePullPolicy: imagePullPolicy},
      // Actions that the management system should take in response to container lifecycle events. Cannot be updated.
      lifecycle(lifecycle):: {lifecycle+: lifecycle},
      // Periodic probe of container liveness. Container will be restarted if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      livenessProbe(livenessProbe):: {livenessProbe+: livenessProbe},
      // Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.
      name(name):: {name: name},
      // List of ports to expose from the container. Exposing a port here gives the system additional information about the network connections a container uses, but is primarily informational. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Cannot be updated.
      ports(ports):: if std.type(ports) == "array" then {ports+: ports} else {ports+: [ports]},
      // Periodic probe of container service readiness. Container will be removed from service endpoints if the probe fails. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      readinessProbe(readinessProbe):: {readinessProbe+: readinessProbe},
      // Compute Resources required by this container. Cannot be updated. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
      resources(resources):: {resources+: resources},
      // Security options the pod should run with. More info: https://kubernetes.io/docs/concepts/policy/security-context/ More info: https://github.com/kubernetes/community/blob/master/contributors/design-proposals/security_context.md
      securityContext(securityContext):: {securityContext+: securityContext},
      // Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.
      stdin(stdin):: {stdin: stdin},
      // Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false
      stdinOnce(stdinOnce):: {stdinOnce: stdinOnce},
      // Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.
      terminationMessagePath(terminationMessagePath):: {terminationMessagePath: terminationMessagePath},
      // Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.
      terminationMessagePolicy(terminationMessagePolicy):: {terminationMessagePolicy: terminationMessagePolicy},
      // Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.
      tty(tty):: {tty: tty},
      // Pod volumes to mount into the container's filesystem. Cannot be updated.
      volumeMounts(volumeMounts):: if std.type(volumeMounts) == "array" then {volumeMounts+: volumeMounts} else {volumeMounts+: [volumeMounts]},
      // Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.
      workingDir(workingDir):: {workingDir: workingDir},
      mixin:: {
        lifecycle:: {
          local lifecycle(mixin) = {lifecycle+: mixin},
          postStart(postStart):: lifecycle($.v1.lifecycle.postStart(postStart)),
          preStop(preStop):: lifecycle($.v1.lifecycle.preStop(preStop)),
        },
        securityContext:: {
          local securityContext(mixin) = {securityContext+: mixin},
          seLinuxOptions(seLinuxOptions):: securityContext($.v1.securityContext.seLinuxOptions(seLinuxOptions)),
          runAsUser(runAsUser):: securityContext($.v1.securityContext.runAsUser(runAsUser)),
          runAsNonRoot(runAsNonRoot):: securityContext($.v1.securityContext.runAsNonRoot(runAsNonRoot)),
          readOnlyRootFilesystem(readOnlyRootFilesystem):: securityContext($.v1.securityContext.readOnlyRootFilesystem(readOnlyRootFilesystem)),
          capabilities(capabilities):: securityContext($.v1.securityContext.capabilities(capabilities)),
          privileged(privileged):: securityContext($.v1.securityContext.privileged(privileged)),
        },
        livenessProbe:: {
          local livenessProbe(mixin) = {livenessProbe+: mixin},
          httpGet(httpGet):: livenessProbe($.v1.probe.httpGet(httpGet)),
          tcpSocket(tcpSocket):: livenessProbe($.v1.probe.tcpSocket(tcpSocket)),
          initialDelaySeconds(initialDelaySeconds):: livenessProbe($.v1.probe.initialDelaySeconds(initialDelaySeconds)),
          timeoutSeconds(timeoutSeconds):: livenessProbe($.v1.probe.timeoutSeconds(timeoutSeconds)),
          periodSeconds(periodSeconds):: livenessProbe($.v1.probe.periodSeconds(periodSeconds)),
          successThreshold(successThreshold):: livenessProbe($.v1.probe.successThreshold(successThreshold)),
          failureThreshold(failureThreshold):: livenessProbe($.v1.probe.failureThreshold(failureThreshold)),
          exec(exec):: livenessProbe($.v1.probe.exec(exec)),
        },
        readinessProbe:: {
          local readinessProbe(mixin) = {readinessProbe+: mixin},
          periodSeconds(periodSeconds):: readinessProbe($.v1.probe.periodSeconds(periodSeconds)),
          successThreshold(successThreshold):: readinessProbe($.v1.probe.successThreshold(successThreshold)),
          failureThreshold(failureThreshold):: readinessProbe($.v1.probe.failureThreshold(failureThreshold)),
          exec(exec):: readinessProbe($.v1.probe.exec(exec)),
          httpGet(httpGet):: readinessProbe($.v1.probe.httpGet(httpGet)),
          tcpSocket(tcpSocket):: readinessProbe($.v1.probe.tcpSocket(tcpSocket)),
          initialDelaySeconds(initialDelaySeconds):: readinessProbe($.v1.probe.initialDelaySeconds(initialDelaySeconds)),
          timeoutSeconds(timeoutSeconds):: readinessProbe($.v1.probe.timeoutSeconds(timeoutSeconds)),
        },
        resources:: {
          local resources(mixin) = {resources+: mixin},
          requests(requests):: resources($.v1.resourceRequirements.requests(requests)),
          limits(limits):: resources($.v1.resourceRequirements.limits(limits)),
        },
      },
    },
    containerPort:: {
      default(containerPort)::
      {
        containerPort: containerPort,
      },
      // Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.
      containerPort(containerPort):: {containerPort: containerPort},
      // What host IP to bind the external port to.
      hostIP(hostIP):: {hostIP: hostIP},
      // Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.
      hostPort(hostPort):: {hostPort: hostPort},
      // If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.
      name(name):: {name: name},
      // Protocol for port. Must be UDP or TCP. Defaults to "TCP".
      protocol(protocol):: {protocol: protocol},
    },
    deleteOptions:: {
      local kind = {kind: "DeleteOptions"},
      default()::
        apiVersion +
        kind +
      {
        preconditions: {},
        propagationPolicy: {},
      },
      // The duration in seconds before the object should be deleted. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period for the specified type will be used. Defaults to a per object value if not specified. zero means delete immediately.
      gracePeriodSeconds(gracePeriodSeconds):: {gracePeriodSeconds: gracePeriodSeconds},
      // Deprecated: please use the PropagationPolicy, this field will be deprecated in 1.7. Should the dependent objects be orphaned. If true/false, the "orphan" finalizer will be added to/removed from the object's finalizers list. Either this field or PropagationPolicy may be set, but not both.
      orphanDependents(orphanDependents):: {orphanDependents: orphanDependents},
      // Must be fulfilled before a deletion is carried out. If not possible, a 409 Conflict status will be returned.
      preconditions(preconditions):: {preconditions+: preconditions},
      // Whether and how garbage collection will be performed. Either this field or OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in the metadata.finalizers and the resource-specific default policy.
      propagationPolicy(propagationPolicy):: {propagationPolicy+: propagationPolicy},
      mixin:: {
        preconditions:: {
          local preconditions(mixin) = {preconditions+: mixin},
          uid(uid):: preconditions($.v1.preconditions.uid(uid)),
        },
      },
    },
    deletionPropagation:: {
    },
    downwardAPIProjection:: {
      default()::
      {
        items: [],
      },
      // Items is a list of DownwardAPIVolume file
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
    },
    downwardAPIVolumeFile:: {
      default(path)::
      {
        fieldRef: {},
        resourceFieldRef: {},
        path: path,
      },
      // Required: Selects a field of the pod: only annotations, labels, name and namespace are supported.
      fieldRef(fieldRef):: {fieldRef+: fieldRef},
      // Optional: mode bits to use on this file, must be a value between 0 and 0777. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      mode(mode):: {mode: mode},
      // Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
      path(path):: {path: path},
      // Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
      resourceFieldRef(resourceFieldRef):: {resourceFieldRef+: resourceFieldRef},
      mixin:: {
        fieldRef:: {
          local fieldRef(mixin) = {fieldRef+: mixin},
          fieldPath(fieldPath):: fieldRef($.v1.objectFieldSelector.fieldPath(fieldPath)),
        },
        resourceFieldRef:: {
          local resourceFieldRef(mixin) = {resourceFieldRef+: mixin},
          containerName(containerName):: resourceFieldRef($.v1.resourceFieldSelector.containerName(containerName)),
          resource(resource):: resourceFieldRef($.v1.resourceFieldSelector.resource(resource)),
          divisor(divisor):: resourceFieldRef($.v1.resourceFieldSelector.divisor(divisor)),
        },
      },
    },
    downwardAPIVolumeSource:: {
      default()::
      {
        items: [],
      },
      // Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // Items is a list of downward API volume file
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
    },
    emptyDirVolumeSource:: {
      // What type of storage medium should back this directory. The default is "" which means to use the node's default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
      medium(medium):: {medium: medium},
    },
    envFromSource:: {
      default()::
      {
        configMapRef: {},
        secretRef: {},
      },
      // The ConfigMap to select from
      configMapRef(configMapRef):: {configMapRef+: configMapRef},
      // An optional identifer to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
      prefix(prefix):: {prefix: prefix},
      // The Secret to select from
      secretRef(secretRef):: {secretRef+: secretRef},
      mixin:: {
        configMapRef:: {
          local configMapRef(mixin) = {configMapRef+: mixin},
          name(name):: configMapRef($.v1.configMapEnvSource.name(name)),
          optional(optional):: configMapRef($.v1.configMapEnvSource.optional(optional)),
        },
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.secretEnvSource.name(name)),
          optional(optional):: secretRef($.v1.secretEnvSource.optional(optional)),
        },
      },
    },
    envVar:: {
      default(name)::
      {
        valueFrom: {},
        name: name,
      },
      // Name of the environment variable. Must be a C_IDENTIFIER.
      name(name):: {name: name},
      // Variable references $(VAR_NAME) are expanded using the previous defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. The $(VAR_NAME) syntax can be escaped with a double $$, ie: $$(VAR_NAME). Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".
      value(value):: {value: value},
      // Source for the environment variable's value. Cannot be used if value is not empty.
      valueFrom(valueFrom):: {valueFrom+: valueFrom},
      mixin:: {
        valueFrom:: {
          local valueFrom(mixin) = {valueFrom+: mixin},
          configMapKeyRef(configMapKeyRef):: valueFrom($.v1.envVarSource.configMapKeyRef(configMapKeyRef)),
          secretKeyRef(secretKeyRef):: valueFrom($.v1.envVarSource.secretKeyRef(secretKeyRef)),
          fieldRef(fieldRef):: valueFrom($.v1.envVarSource.fieldRef(fieldRef)),
          resourceFieldRef(resourceFieldRef):: valueFrom($.v1.envVarSource.resourceFieldRef(resourceFieldRef)),
        },
      },
    },
    envVarSource:: {
      default()::
      {
        configMapKeyRef: {},
        secretKeyRef: {},
        fieldRef: {},
        resourceFieldRef: {},
      },
      // Selects a key of a ConfigMap.
      configMapKeyRef(configMapKeyRef):: {configMapKeyRef+: configMapKeyRef},
      // Selects a field of the pod: supports metadata.name, metadata.namespace, metadata.labels, metadata.annotations, spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP.
      fieldRef(fieldRef):: {fieldRef+: fieldRef},
      // Selects a resource of the container: only resources limits and requests (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
      resourceFieldRef(resourceFieldRef):: {resourceFieldRef+: resourceFieldRef},
      // Selects a key of a secret in the pod's namespace
      secretKeyRef(secretKeyRef):: {secretKeyRef+: secretKeyRef},
      mixin:: {
        fieldRef:: {
          local fieldRef(mixin) = {fieldRef+: mixin},
          fieldPath(fieldPath):: fieldRef($.v1.objectFieldSelector.fieldPath(fieldPath)),
        },
        resourceFieldRef:: {
          local resourceFieldRef(mixin) = {resourceFieldRef+: mixin},
          containerName(containerName):: resourceFieldRef($.v1.resourceFieldSelector.containerName(containerName)),
          resource(resource):: resourceFieldRef($.v1.resourceFieldSelector.resource(resource)),
          divisor(divisor):: resourceFieldRef($.v1.resourceFieldSelector.divisor(divisor)),
        },
        configMapKeyRef:: {
          local configMapKeyRef(mixin) = {configMapKeyRef+: mixin},
          name(name):: configMapKeyRef($.v1.configMapKeySelector.name(name)),
          key(key):: configMapKeyRef($.v1.configMapKeySelector.key(key)),
          optional(optional):: configMapKeyRef($.v1.configMapKeySelector.optional(optional)),
        },
        secretKeyRef:: {
          local secretKeyRef(mixin) = {secretKeyRef+: mixin},
          optional(optional):: secretKeyRef($.v1.secretKeySelector.optional(optional)),
          name(name):: secretKeyRef($.v1.secretKeySelector.name(name)),
          key(key):: secretKeyRef($.v1.secretKeySelector.key(key)),
        },
      },
    },
    execAction:: {
      default()::
      {
        command: [],
      },
      // Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
      command(command):: if std.type(command) == "array" then {command+: command} else {command+: [command]},
    },
    fCVolumeSource:: {
      default(targetWWNs, lun)::
      {
        targetWWNs: targetWWNs,
        lun: lun,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Required: FC target lun number
      lun(lun):: {lun: lun},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // Required: FC target worldwide names (WWNs)
      targetWWNs(targetWWNs):: if std.type(targetWWNs) == "array" then {targetWWNs+: targetWWNs} else {targetWWNs+: [targetWWNs]},
    },
    flexVolumeSource:: {
      default(driver)::
      {
        driver: driver,
        secretRef: {},
        options: {},
      },
      // Driver is the name of the driver to use for this volume.
      driver(driver):: {driver: driver},
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
      fsType(fsType):: {fsType: fsType},
      // Optional: Extra command options if any.
      options(options):: {options+: options},
      // Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // Optional: SecretRef is reference to the secret object containing sensitive information to pass to the plugin scripts. This may be empty if no secret object is specified. If the secret object contains more than one secret, all secrets are passed to the plugin scripts.
      secretRef(secretRef):: {secretRef+: secretRef},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    flockerVolumeSource:: {
      // Name of the dataset stored as metadata -> name on the dataset for Flocker should be considered as deprecated
      datasetName(datasetName):: {datasetName: datasetName},
      // UUID of the dataset. This is unique identifier of a Flocker dataset
      datasetUUID(datasetUUID):: {datasetUUID: datasetUUID},
    },
    gCEPersistentDiskVolumeSource:: {
      default(pdName)::
      {
        pdName: pdName,
      },
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      fsType(fsType):: {fsType: fsType},
      // The partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty). More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      partition(partition):: {partition: partition},
      // Unique name of the PD resource in GCE. Used to identify the disk in GCE. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      pdName(pdName):: {pdName: pdName},
      // ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      readOnly(readOnly):: {readOnly: readOnly},
    },
    gitRepoVolumeSource:: {
      default(repository)::
      {
        repository: repository,
      },
      // Target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.
      directory(directory):: {directory: directory},
      // Repository URL
      repository(repository):: {repository: repository},
      // Commit hash for the specified revision.
      revision(revision):: {revision: revision},
    },
    glusterfsVolumeSource:: {
      default(endpoints, path)::
      {
        endpoints: endpoints,
        path: path,
      },
      // EndpointsName is the endpoint name that details Glusterfs topology. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
      endpoints(endpoints):: {endpoints: endpoints},
      // Path is the Glusterfs volume path. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
      path(path):: {path: path},
      // ReadOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md#create-a-pod
      readOnly(readOnly):: {readOnly: readOnly},
    },
    hTTPGetAction:: {
      default(port)::
      {
        port: port,
        httpHeaders: [],
      },
      // Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.
      host(host):: {host: host},
      // Custom headers to set in the request. HTTP allows repeated headers.
      httpHeaders(httpHeaders):: if std.type(httpHeaders) == "array" then {httpHeaders+: httpHeaders} else {httpHeaders+: [httpHeaders]},
      // Path to access on the HTTP server.
      path(path):: {path: path},
      // Name or number of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
      port(port):: {port: port},
      // Scheme to use for connecting to the host. Defaults to HTTP.
      scheme(scheme):: {scheme: scheme},
    },
    hTTPHeader:: {
      default(name, value)::
      {
        name: name,
        value: value,
      },
      // The header field name
      name(name):: {name: name},
      // The header field value
      value(value):: {value: value},
    },
    handler:: {
      default()::
      {
        tcpSocket: {},
        exec: {},
        httpGet: {},
      },
      // One and only one of the following should be specified. Exec specifies the action to take.
      exec(exec):: {exec+: exec},
      // HTTPGet specifies the http request to perform.
      httpGet(httpGet):: {httpGet+: httpGet},
      // TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported
      tcpSocket(tcpSocket):: {tcpSocket+: tcpSocket},
      mixin:: {
        exec:: {
          local exec(mixin) = {exec+: mixin},
          command(command):: exec($.v1.execAction.command(command)),
        },
        httpGet:: {
          local httpGet(mixin) = {httpGet+: mixin},
          httpHeaders(httpHeaders):: httpGet($.v1.hTTPGetAction.httpHeaders(httpHeaders)),
          path(path):: httpGet($.v1.hTTPGetAction.path(path)),
          port(port):: httpGet($.v1.hTTPGetAction.port(port)),
          host(host):: httpGet($.v1.hTTPGetAction.host(host)),
          scheme(scheme):: httpGet($.v1.hTTPGetAction.scheme(scheme)),
        },
        tcpSocket:: {
          local tcpSocket(mixin) = {tcpSocket+: mixin},
          port(port):: tcpSocket($.v1.tCPSocketAction.port(port)),
          host(host):: tcpSocket($.v1.tCPSocketAction.host(host)),
        },
      },
    },
    hostAlias:: {
      default()::
      {
        hostnames: [],
      },
      // Hostnames for the the above IP address.
      hostnames(hostnames):: if std.type(hostnames) == "array" then {hostnames+: hostnames} else {hostnames+: [hostnames]},
      // IP address of the host file entry.
      ip(ip):: {ip: ip},
    },
    hostPathVolumeSource:: {
      default(path)::
      {
        path: path,
      },
      // Path of the directory on the host. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
      path(path):: {path: path},
    },
    iSCSIVolumeSource:: {
      default(targetPortal, iqn, lun)::
      {
        portals: [],
        secretRef: {},
        targetPortal: targetPortal,
        iqn: iqn,
        lun: lun,
      },
      // whether support iSCSI Discovery CHAP authentication
      chapAuthDiscovery(chapAuthDiscovery):: {chapAuthDiscovery: chapAuthDiscovery},
      // whether support iSCSI Session CHAP authentication
      chapAuthSession(chapAuthSession):: {chapAuthSession: chapAuthSession},
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
      fsType(fsType):: {fsType: fsType},
      // Target iSCSI Qualified Name.
      iqn(iqn):: {iqn: iqn},
      // Optional: Defaults to 'default' (tcp). iSCSI interface name that uses an iSCSI transport.
      iscsiInterface(iscsiInterface):: {iscsiInterface: iscsiInterface},
      // iSCSI target lun number.
      lun(lun):: {lun: lun},
      // iSCSI target portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
      portals(portals):: if std.type(portals) == "array" then {portals+: portals} else {portals+: [portals]},
      // ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.
      readOnly(readOnly):: {readOnly: readOnly},
      // CHAP secret for iSCSI target and initiator authentication
      secretRef(secretRef):: {secretRef+: secretRef},
      // iSCSI target portal. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).
      targetPortal(targetPortal):: {targetPortal: targetPortal},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    initializer:: {
      default(name)::
      {
        name: name,
      },
      // name of the process that is responsible for initializing this object.
      name(name):: {name: name},
    },
    initializers:: {
      default(pending)::
      {
        pending: pending,
        result: {},
      },
      // Pending is a list of initializers that must execute in order before this object is visible. When the last pending initializer is removed, and no failing result is set, the initializers struct will be set to nil and the object is considered as initialized and visible to all clients.
      pending(pending):: if std.type(pending) == "array" then {pending+: pending} else {pending+: [pending]},
      // If result is set with the Failure field, the object will be persisted to storage and then deleted, ensuring that other clients can observe the deletion.
      result(result):: {result+: result},
      mixin:: {
        result:: {
          local result(mixin) = {result+: mixin},
          reason(reason):: result($.v1.status.reason(reason)),
          details(details):: result($.v1.status.details(details)),
          code(code):: result($.v1.status.code(code)),
          status(status):: result($.v1.status.status(status)),
          message(message):: result($.v1.status.message(message)),
        },
      },
    },
    keyToPath:: {
      default(key, path)::
      {
        key: key,
        path: path,
      },
      // The key to project.
      key(key):: {key: key},
      // Optional: mode bits to use on this file, must be a value between 0 and 0777. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      mode(mode):: {mode: mode},
      // The relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.
      path(path):: {path: path},
    },
    labelSelector:: {
      default()::
      {
        matchLabels: {},
        matchExpressions: [],
      },
      // matchExpressions is a list of label selector requirements. The requirements are ANDed.
      matchExpressions(matchExpressions):: if std.type(matchExpressions) == "array" then {matchExpressions+: matchExpressions} else {matchExpressions+: [matchExpressions]},
      // matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
      matchLabels(matchLabels):: {matchLabels+: matchLabels},
    },
    labelSelectorRequirement:: {
      default(key, operator)::
      {
        operator: operator,
        values: [],
        key: key,
      },
      // key is the label key that the selector applies to.
      key(key):: {key: key},
      // operator represents a key's relationship to a set of values. Valid operators ard In, NotIn, Exists and DoesNotExist.
      operator(operator):: {operator: operator},
      // values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
      values(values):: if std.type(values) == "array" then {values+: values} else {values+: [values]},
    },
    lifecycle:: {
      default()::
      {
        preStop: {},
        postStart: {},
      },
      // PostStart is called immediately after a container is created. If the handler fails, the container is terminated and restarted according to its restart policy. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
      postStart(postStart):: {postStart+: postStart},
      // PreStop is called immediately before a container is terminated. The container is terminated after the handler completes. The reason for termination is passed to the handler. Regardless of the outcome of the handler, the container is eventually terminated. Other management of the container blocks until the hook completes. More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
      preStop(preStop):: {preStop+: preStop},
      mixin:: {
        postStart:: {
          local postStart(mixin) = {postStart+: mixin},
          exec(exec):: postStart($.v1.handler.exec(exec)),
          httpGet(httpGet):: postStart($.v1.handler.httpGet(httpGet)),
          tcpSocket(tcpSocket):: postStart($.v1.handler.tcpSocket(tcpSocket)),
        },
        preStop:: {
          local preStop(mixin) = {preStop+: mixin},
          httpGet(httpGet):: preStop($.v1.handler.httpGet(httpGet)),
          tcpSocket(tcpSocket):: preStop($.v1.handler.tcpSocket(tcpSocket)),
          exec(exec):: preStop($.v1.handler.exec(exec)),
        },
      },
    },
    listMeta:: {
      // String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#concurrency-control-and-consistency
      resourceVersion(resourceVersion):: {resourceVersion: resourceVersion},
      // SelfLink is a URL representing this object. Populated by the system. Read-only.
      selfLink(selfLink):: {selfLink: selfLink},
    },
    localObjectReference:: {
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
    },
    nFSVolumeSource:: {
      default(server, path)::
      {
        server: server,
        path: path,
      },
      // Path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      path(path):: {path: path},
      // ReadOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      readOnly(readOnly):: {readOnly: readOnly},
      // Server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      server(server):: {server: server},
    },
    nodeAffinity:: {
      default()::
      {
        requiredDuringSchedulingIgnoredDuringExecution: {},
        preferredDuringSchedulingIgnoredDuringExecution: [],
      },
      // The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.
      preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: if std.type(preferredDuringSchedulingIgnoredDuringExecution) == "array" then {preferredDuringSchedulingIgnoredDuringExecution+: preferredDuringSchedulingIgnoredDuringExecution} else {preferredDuringSchedulingIgnoredDuringExecution+: [preferredDuringSchedulingIgnoredDuringExecution]},
      // If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to an update), the system may or may not try to eventually evict the pod from its node.
      requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: {requiredDuringSchedulingIgnoredDuringExecution+: requiredDuringSchedulingIgnoredDuringExecution},
      mixin:: {
        requiredDuringSchedulingIgnoredDuringExecution:: {
          local requiredDuringSchedulingIgnoredDuringExecution(mixin) = {requiredDuringSchedulingIgnoredDuringExecution+: mixin},
          nodeSelectorTerms(nodeSelectorTerms):: requiredDuringSchedulingIgnoredDuringExecution($.v1.nodeSelector.nodeSelectorTerms(nodeSelectorTerms)),
        },
      },
    },
    nodeSelector:: {
      default(nodeSelectorTerms)::
      {
        nodeSelectorTerms: nodeSelectorTerms,
      },
      // Required. A list of node selector terms. The terms are ORed.
      nodeSelectorTerms(nodeSelectorTerms):: if std.type(nodeSelectorTerms) == "array" then {nodeSelectorTerms+: nodeSelectorTerms} else {nodeSelectorTerms+: [nodeSelectorTerms]},
    },
    nodeSelectorRequirement:: {
      default(key, operator)::
      {
        key: key,
        operator: operator,
        values: [],
      },
      // The label key that the selector applies to.
      key(key):: {key: key},
      // Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
      operator(operator):: {operator: operator},
      // An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.
      values(values):: if std.type(values) == "array" then {values+: values} else {values+: [values]},
    },
    nodeSelectorTerm:: {
      default(matchExpressions)::
      {
        matchExpressions: matchExpressions,
      },
      // Required. A list of node selector requirements. The requirements are ANDed.
      matchExpressions(matchExpressions):: if std.type(matchExpressions) == "array" then {matchExpressions+: matchExpressions} else {matchExpressions+: [matchExpressions]},
    },
    objectFieldSelector:: {
      default(fieldPath)::
        apiVersion +
      {
        fieldPath: fieldPath,
      },
      // Path of the field to select in the specified API version.
      fieldPath(fieldPath):: {fieldPath: fieldPath},
    },
    objectMeta:: {
      default()::
      {
        ownerReferences: [],
        initializers: {},
        labels: {},
        annotations: {},
        finalizers: [],
      },
      // Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations
      annotations(annotations):: {annotations+: annotations},
      // The name of the cluster which the object belongs to. This is used to distinguish resources with same name and namespace in different clusters. This field is not set anywhere right now and apiserver is going to ignore it if set in create or update request.
      clusterName(clusterName):: {clusterName: clusterName},
      // CreationTimestamp is a timestamp representing the server time when this object was created. It is not guaranteed to be set in happens-before order across separate operations. Clients may not set this value. It is represented in RFC3339 form and is in UTC.
      //
      // Populated by the system. Read-only. Null for lists. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#metadata
      creationTimestamp(creationTimestamp):: {creationTimestamp: creationTimestamp},
      // Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.
      deletionGracePeriodSeconds(deletionGracePeriodSeconds):: {deletionGracePeriodSeconds: deletionGracePeriodSeconds},
      // DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This field is set by the server when a graceful deletion is requested by the user, and is not directly settable by a client. The resource is expected to be deleted (no longer visible from resource lists, and not reachable by name) after the time in this field. Once set, this value may not be unset or be set further into the future, although it may be shortened or the resource may be deleted prior to this time. For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react by sending a graceful termination signal to the containers in the pod. After that 30 seconds, the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup, remove the pod from the API. In the presence of network partitions, this object may still exist after this timestamp, until an administrator or automated process can determine the resource is fully terminated. If not set, graceful deletion of the object has not been requested.
      //
      // Populated by the system when a graceful deletion is requested. Read-only. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#metadata
      deletionTimestamp(deletionTimestamp):: {deletionTimestamp: deletionTimestamp},
      // Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed.
      finalizers(finalizers):: if std.type(finalizers) == "array" then {finalizers+: finalizers} else {finalizers+: [finalizers]},
      // GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.
      //
      // If this field is specified and the generated name exists, the server will NOT return a 409 - instead, it will either return 201 Created or 500 with Reason ServerTimeout indicating a unique name could not be found in the time allotted, and the client should retry (optionally after the time indicated in the Retry-After header).
      //
      // Applied only if Name is not specified. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#idempotency
      generateName(generateName):: {generateName: generateName},
      // A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.
      generation(generation):: {generation: generation},
      // An initializer is a controller which enforces some system invariant at object creation time. This field is a list of initializers that have not yet acted on this object. If nil or empty, this object has been completely initialized. Otherwise, the object is considered uninitialized and is hidden (in list/watch and get calls) from clients that haven't explicitly asked to observe uninitialized objects.
      //
      // When an object is created, the system will populate this list with the current set of initializers. Only privileged users may set or modify this list. Once it is empty, it may not be modified further by any user.
      initializers(initializers):: {initializers+: initializers},
      // Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels
      labels(labels):: {labels+: labels},
      // Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names
      name(name):: {name: name},
      // Namespace defines the space within each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.
      //
      // Must be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces
      namespace(namespace):: {namespace: namespace},
      // List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.
      ownerReferences(ownerReferences):: if std.type(ownerReferences) == "array" then {ownerReferences+: ownerReferences} else {ownerReferences+: [ownerReferences]},
      // An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.
      //
      // Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#concurrency-control-and-consistency
      resourceVersion(resourceVersion):: {resourceVersion: resourceVersion},
      // SelfLink is a URL representing this object. Populated by the system. Read-only.
      selfLink(selfLink):: {selfLink: selfLink},
      // UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.
      //
      // Populated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
      uid(uid):: {uid: uid},
      mixin:: {
        initializers:: {
          local initializers(mixin) = {initializers+: mixin},
          pending(pending):: initializers($.v1.initializers.pending(pending)),
          result(result):: initializers($.v1.initializers.result(result)),
        },
      },
    },
    ownerReference:: {
      local kind = {kind: "OwnerReference"},
      default(apiVersion, kind, name, uid)::
        apiVersion +
        kind +
      {
        apiVersion: apiVersion,
        kind: kind,
        name: name,
        uid: uid,
      },
      // If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.
      blockOwnerDeletion(blockOwnerDeletion):: {blockOwnerDeletion: blockOwnerDeletion},
      // If true, this reference points to the managing controller.
      controller(controller):: {controller: controller},
      // Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names
      name(name):: {name: name},
      // UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids
      uid(uid):: {uid: uid},
    },
    patch:: {
    },
    persistentVolumeAccessMode:: {
    },
    persistentVolumeClaim:: {
      local kind = {kind: "PersistentVolumeClaim"},
      default(name, namespace="default")::
        defaultMetadata(name, namespace) +
        kind +
        apiVersion +
      {
        status: {},
        spec: {},
      },
      // Spec defines the desired characteristics of a volume requested by a pod author. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      spec(spec):: {spec+: spec},
      // Status represents the current information/status of a persistent volume claim. Read-only. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      status(status):: {status+: status},
      mixin:: {
        spec:: {
          local spec(mixin) = {spec+: mixin},
          resources(resources):: spec($.v1.persistentVolumeClaimSpec.resources(resources)),
          volumeName(volumeName):: spec($.v1.persistentVolumeClaimSpec.volumeName(volumeName)),
          storageClassName(storageClassName):: spec($.v1.persistentVolumeClaimSpec.storageClassName(storageClassName)),
          accessModes(accessModes):: spec($.v1.persistentVolumeClaimSpec.accessModes(accessModes)),
          selector(selector):: spec($.v1.persistentVolumeClaimSpec.selector(selector)),
        },
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          accessModes(accessModes):: status($.v1.persistentVolumeClaimStatus.accessModes(accessModes)),
          capacity(capacity):: status($.v1.persistentVolumeClaimStatus.capacity(capacity)),
          phase(phase):: status($.v1.persistentVolumeClaimStatus.phase(phase)),
        },
      },
    },
    persistentVolumeClaimSpec:: {
      default()::
      {
        accessModes: [],
        selector: {},
        resources: {},
      },
      // AccessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
      accessModes(accessModes):: if std.type(accessModes) == "array" then {accessModes+: accessModes} else {accessModes+: [accessModes]},
      // Resources represents the minimum resources the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
      resources(resources):: {resources+: resources},
      // A label query over volumes to consider for binding.
      selector(selector):: {selector+: selector},
      // Name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
      storageClassName(storageClassName):: {storageClassName: storageClassName},
      // VolumeName is the binding reference to the PersistentVolume backing this claim.
      volumeName(volumeName):: {volumeName: volumeName},
      mixin:: {
        selector:: {
          local selector(mixin) = {selector+: mixin},
          matchExpressions(matchExpressions):: selector($.v1.labelSelector.matchExpressions(matchExpressions)),
          matchLabels(matchLabels):: selector($.v1.labelSelector.matchLabels(matchLabels)),
        },
        resources:: {
          local resources(mixin) = {resources+: mixin},
          limits(limits):: resources($.v1.resourceRequirements.limits(limits)),
          requests(requests):: resources($.v1.resourceRequirements.requests(requests)),
        },
      },
    },
    persistentVolumeClaimStatus:: {
      default()::
      {
        accessModes: [],
        capacity: {},
      },
      // AccessModes contains the actual access modes the volume backing the PVC has. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
      accessModes(accessModes):: if std.type(accessModes) == "array" then {accessModes+: accessModes} else {accessModes+: [accessModes]},
      // Represents the actual resources of the underlying volume.
      capacity(capacity):: {capacity+: capacity},
      // Phase represents the current phase of PersistentVolumeClaim.
      phase(phase):: {phase: phase},
    },
    persistentVolumeClaimVolumeSource:: {
      default(claimName)::
      {
        claimName: claimName,
      },
      // ClaimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      claimName(claimName):: {claimName: claimName},
      // Will force the ReadOnly setting in VolumeMounts. Default false.
      readOnly(readOnly):: {readOnly: readOnly},
    },
    photonPersistentDiskVolumeSource:: {
      default(pdID)::
      {
        pdID: pdID,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // ID that identifies Photon Controller persistent disk
      pdID(pdID):: {pdID: pdID},
    },
    podAffinity:: {
      default()::
      {
        requiredDuringSchedulingIgnoredDuringExecution: [],
        preferredDuringSchedulingIgnoredDuringExecution: [],
      },
      // The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
      preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: if std.type(preferredDuringSchedulingIgnoredDuringExecution) == "array" then {preferredDuringSchedulingIgnoredDuringExecution+: preferredDuringSchedulingIgnoredDuringExecution} else {preferredDuringSchedulingIgnoredDuringExecution+: [preferredDuringSchedulingIgnoredDuringExecution]},
      // NOT YET IMPLEMENTED. TODO: Uncomment field once it is implemented. If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system will try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied. RequiredDuringSchedulingRequiredDuringExecution []PodAffinityTerm  \`json:"requiredDuringSchedulingRequiredDuringExecution,omitempty"\` If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
      requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: if std.type(requiredDuringSchedulingIgnoredDuringExecution) == "array" then {requiredDuringSchedulingIgnoredDuringExecution+: requiredDuringSchedulingIgnoredDuringExecution} else {requiredDuringSchedulingIgnoredDuringExecution+: [requiredDuringSchedulingIgnoredDuringExecution]},
    },
    podAffinityTerm:: {
      default()::
      {
        labelSelector: {},
        namespaces: [],
      },
      // A label query over a set of resources, in this case pods.
      labelSelector(labelSelector):: {labelSelector+: labelSelector},
      // namespaces specifies which namespaces the labelSelector applies to (matches against); null or empty list means "this pod's namespace"
      namespaces(namespaces):: if std.type(namespaces) == "array" then {namespaces+: namespaces} else {namespaces+: [namespaces]},
      // This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. For PreferredDuringScheduling pod anti-affinity, empty topologyKey is interpreted as "all topologies" ("all topologies" here means all the topologyKeys indicated by scheduler command-line argument --failure-domains); for affinity and for RequiredDuringScheduling pod anti-affinity, empty topologyKey is not allowed.
      topologyKey(topologyKey):: {topologyKey: topologyKey},
      mixin:: {
        labelSelector:: {
          local labelSelector(mixin) = {labelSelector+: mixin},
          matchLabels(matchLabels):: labelSelector($.v1.labelSelector.matchLabels(matchLabels)),
          matchExpressions(matchExpressions):: labelSelector($.v1.labelSelector.matchExpressions(matchExpressions)),
        },
      },
    },
    podAntiAffinity:: {
      default()::
      {
        requiredDuringSchedulingIgnoredDuringExecution: [],
        preferredDuringSchedulingIgnoredDuringExecution: [],
      },
      // The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.
      preferredDuringSchedulingIgnoredDuringExecution(preferredDuringSchedulingIgnoredDuringExecution):: if std.type(preferredDuringSchedulingIgnoredDuringExecution) == "array" then {preferredDuringSchedulingIgnoredDuringExecution+: preferredDuringSchedulingIgnoredDuringExecution} else {preferredDuringSchedulingIgnoredDuringExecution+: [preferredDuringSchedulingIgnoredDuringExecution]},
      // NOT YET IMPLEMENTED. TODO: Uncomment field once it is implemented. If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system will try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied. RequiredDuringSchedulingRequiredDuringExecution []PodAffinityTerm  \`json:"requiredDuringSchedulingRequiredDuringExecution,omitempty"\` If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.
      requiredDuringSchedulingIgnoredDuringExecution(requiredDuringSchedulingIgnoredDuringExecution):: if std.type(requiredDuringSchedulingIgnoredDuringExecution) == "array" then {requiredDuringSchedulingIgnoredDuringExecution+: requiredDuringSchedulingIgnoredDuringExecution} else {requiredDuringSchedulingIgnoredDuringExecution+: [requiredDuringSchedulingIgnoredDuringExecution]},
    },
    podSecurityContext:: {
      default()::
      {
        supplementalGroups: [],
        fsGroup: {},
        seLinuxOptions: {},
        runAsUser: {},
      },
      // A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:
      //
      // 1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw
      fsGroup(fsGroup):: {fsGroup+: fsGroup},
      // Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      runAsNonRoot(runAsNonRoot):: {runAsNonRoot: runAsNonRoot},
      // The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
      runAsUser(runAsUser):: {runAsUser+: runAsUser},
      // The SELinux context to be applied to all containers. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container.
      seLinuxOptions(seLinuxOptions):: {seLinuxOptions+: seLinuxOptions},
      // A list of groups applied to the first process run in each container, in addition to the container's primary GID.  If unspecified, no groups will be added to any container.
      supplementalGroups(supplementalGroups):: if std.type(supplementalGroups) == "array" then {supplementalGroups+: supplementalGroups} else {supplementalGroups+: [supplementalGroups]},
      mixin:: {
        seLinuxOptions:: {
          local seLinuxOptions(mixin) = {seLinuxOptions+: mixin},
          user(user):: seLinuxOptions($.v1.sELinuxOptions.user(user)),
          role(role):: seLinuxOptions($.v1.sELinuxOptions.role(role)),
          type(type):: seLinuxOptions($.v1.sELinuxOptions.type(type)),
          level(level):: seLinuxOptions($.v1.sELinuxOptions.level(level)),
        },
      },
    },
    podSpec:: {
      default(containers)::
      {
        securityContext: {},
        containers: containers,
        imagePullSecrets: [],
        nodeSelector: {},
        affinity: {},
        tolerations: [],
        volumes: [],
        initContainers: [],
        hostMappings: [],
      },
      // Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.
      activeDeadlineSeconds(activeDeadlineSeconds):: {activeDeadlineSeconds: activeDeadlineSeconds},
      // If specified, the pod's scheduling constraints
      affinity(affinity):: {affinity+: affinity},
      // AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.
      automountServiceAccountToken(automountServiceAccountToken):: {automountServiceAccountToken: automountServiceAccountToken},
      // List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.
      containers(containers):: if std.type(containers) == "array" then {containers+: containers} else {containers+: [containers]},
      // Set DNS policy for containers within the pod. One of 'ClusterFirstWithHostNet', 'ClusterFirst' or 'Default'. Defaults to "ClusterFirst". To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.
      dnsPolicy(dnsPolicy):: {dnsPolicy: dnsPolicy},
      // Use the host's ipc namespace. Optional: Default to false.
      hostIPC(hostIPC):: {hostIPC: hostIPC},
      // HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.
      hostMappings(hostMappings):: if std.type(hostMappings) == "array" then {hostMappings+: hostMappings} else {hostMappings+: [hostMappings]},
      // Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.
      hostNetwork(hostNetwork):: {hostNetwork: hostNetwork},
      // Use the host's pid namespace. Optional: Default to false.
      hostPID(hostPID):: {hostPID: hostPID},
      // Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.
      hostname(hostname):: {hostname: hostname},
      // ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. For example, in the case of docker, only DockerConfig type secrets are honored. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod
      imagePullSecrets(imagePullSecrets):: if std.type(imagePullSecrets) == "array" then {imagePullSecrets+: imagePullSecrets} else {imagePullSecrets+: [imagePullSecrets]},
      // List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, or Liveness probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
      initContainers(initContainers):: if std.type(initContainers) == "array" then {initContainers+: initContainers} else {initContainers+: [initContainers]},
      // NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.
      nodeName(nodeName):: {nodeName: nodeName},
      // NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/
      nodeSelector(nodeSelector):: {nodeSelector+: nodeSelector},
      // Restart policy for all containers within the pod. One of Always, OnFailure, Never. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy
      restartPolicy(restartPolicy):: {restartPolicy: restartPolicy},
      // If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.
      schedulerName(schedulerName):: {schedulerName: schedulerName},
      // SecurityContext holds pod-level security attributes and common container settings. Optional: Defaults to empty.  See type description for default values of each field.
      securityContext(securityContext):: {securityContext+: securityContext},
      // DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.
      serviceAccount(serviceAccount):: {serviceAccount: serviceAccount},
      // ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/
      serviceAccountName(serviceAccountName):: {serviceAccountName: serviceAccountName},
      // If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.
      subdomain(subdomain):: {subdomain: subdomain},
      // Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates delete immediately. If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.
      terminationGracePeriodSeconds(terminationGracePeriodSeconds):: {terminationGracePeriodSeconds: terminationGracePeriodSeconds},
      // If specified, the pod's tolerations.
      tolerations(tolerations):: if std.type(tolerations) == "array" then {tolerations+: tolerations} else {tolerations+: [tolerations]},
      // List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes
      volumes(volumes):: if std.type(volumes) == "array" then {volumes+: volumes} else {volumes+: [volumes]},
      mixin:: {
        affinity:: {
          local affinity(mixin) = {affinity+: mixin},
          podAffinity(podAffinity):: affinity($.v1.affinity.podAffinity(podAffinity)),
          podAntiAffinity(podAntiAffinity):: affinity($.v1.affinity.podAntiAffinity(podAntiAffinity)),
          nodeAffinity(nodeAffinity):: affinity($.v1.affinity.nodeAffinity(nodeAffinity)),
        },
        securityContext:: {
          local securityContext(mixin) = {securityContext+: mixin},
          fsGroup(fsGroup):: securityContext($.v1.podSecurityContext.fsGroup(fsGroup)),
          seLinuxOptions(seLinuxOptions):: securityContext($.v1.podSecurityContext.seLinuxOptions(seLinuxOptions)),
          runAsUser(runAsUser):: securityContext($.v1.podSecurityContext.runAsUser(runAsUser)),
          runAsNonRoot(runAsNonRoot):: securityContext($.v1.podSecurityContext.runAsNonRoot(runAsNonRoot)),
          supplementalGroups(supplementalGroups):: securityContext($.v1.podSecurityContext.supplementalGroups(supplementalGroups)),
        },
      },
    },
    podTemplateSpec:: {
      default(name, namespace="default")::
        defaultMetadata(name, namespace) +
      {
        spec: {},
      },
      // Specification of the desired behavior of the pod. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/api-conventions.md#spec-and-status
      spec(spec):: {spec+: spec},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          serviceAccountName(serviceAccountName):: spec($.v1.podSpec.serviceAccountName(serviceAccountName)),
          hostPID(hostPID):: spec($.v1.podSpec.hostPID(hostPID)),
          volumes(volumes):: spec($.v1.podSpec.volumes(volumes)),
          nodeName(nodeName):: spec($.v1.podSpec.nodeName(nodeName)),
          hostMappings(hostMappings):: spec($.v1.podSpec.hostMappings(hostMappings)),
          restartPolicy(restartPolicy):: spec($.v1.podSpec.restartPolicy(restartPolicy)),
          activeDeadlineSeconds(activeDeadlineSeconds):: spec($.v1.podSpec.activeDeadlineSeconds(activeDeadlineSeconds)),
          terminationGracePeriodSeconds(terminationGracePeriodSeconds):: spec($.v1.podSpec.terminationGracePeriodSeconds(terminationGracePeriodSeconds)),
          tolerations(tolerations):: spec($.v1.podSpec.tolerations(tolerations)),
          schedulerName(schedulerName):: spec($.v1.podSpec.schedulerName(schedulerName)),
          securityContext(securityContext):: spec($.v1.podSpec.securityContext(securityContext)),
          hostname(hostname):: spec($.v1.podSpec.hostname(hostname)),
          initContainers(initContainers):: spec($.v1.podSpec.initContainers(initContainers)),
          imagePullSecrets(imagePullSecrets):: spec($.v1.podSpec.imagePullSecrets(imagePullSecrets)),
          hostNetwork(hostNetwork):: spec($.v1.podSpec.hostNetwork(hostNetwork)),
          nodeSelector(nodeSelector):: spec($.v1.podSpec.nodeSelector(nodeSelector)),
          dnsPolicy(dnsPolicy):: spec($.v1.podSpec.dnsPolicy(dnsPolicy)),
          containers(containers):: spec($.v1.podSpec.containers(containers)),
          serviceAccount(serviceAccount):: spec($.v1.podSpec.serviceAccount(serviceAccount)),
          automountServiceAccountToken(automountServiceAccountToken):: spec($.v1.podSpec.automountServiceAccountToken(automountServiceAccountToken)),
          affinity(affinity):: spec($.v1.podSpec.affinity(affinity)),
          subdomain(subdomain):: spec($.v1.podSpec.subdomain(subdomain)),
          hostIPC(hostIPC):: spec($.v1.podSpec.hostIPC(hostIPC)),
        },
      },
    },
    portworxVolumeSource:: {
      default(volumeID)::
      {
        volumeID: volumeID,
      },
      // FSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // VolumeID uniquely identifies a Portworx volume
      volumeID(volumeID):: {volumeID: volumeID},
    },
    preconditions:: {
      default()::
      {
        uid: {},
      },
      // Specifies the target UID.
      uid(uid):: {uid+: uid},
    },
    preferredSchedulingTerm:: {
      default(weight, preference)::
      {
        preference: preference,
        weight: weight,
      },
      // A node selector term, associated with the corresponding weight.
      preference(preference):: {preference+: preference},
      // Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
      weight(weight):: {weight: weight},
      mixin:: {
        preference:: {
          local preference(mixin) = {preference+: mixin},
          matchExpressions(matchExpressions):: preference($.v1.nodeSelectorTerm.matchExpressions(matchExpressions)),
        },
      },
    },
    probe:: {
      default()::
      {
        exec: {},
        httpGet: {},
        tcpSocket: {},
      },
      // One and only one of the following should be specified. Exec specifies the action to take.
      exec(exec):: {exec+: exec},
      // Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.
      failureThreshold(failureThreshold):: {failureThreshold: failureThreshold},
      // HTTPGet specifies the http request to perform.
      httpGet(httpGet):: {httpGet+: httpGet},
      // Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      initialDelaySeconds(initialDelaySeconds):: {initialDelaySeconds: initialDelaySeconds},
      // How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
      periodSeconds(periodSeconds):: {periodSeconds: periodSeconds},
      // Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness. Minimum value is 1.
      successThreshold(successThreshold):: {successThreshold: successThreshold},
      // TCPSocket specifies an action involving a TCP port. TCP hooks not yet supported
      tcpSocket(tcpSocket):: {tcpSocket+: tcpSocket},
      // Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
      timeoutSeconds(timeoutSeconds):: {timeoutSeconds: timeoutSeconds},
      mixin:: {
        tcpSocket:: {
          local tcpSocket(mixin) = {tcpSocket+: mixin},
          port(port):: tcpSocket($.v1.tCPSocketAction.port(port)),
          host(host):: tcpSocket($.v1.tCPSocketAction.host(host)),
        },
        exec:: {
          local exec(mixin) = {exec+: mixin},
          command(command):: exec($.v1.execAction.command(command)),
        },
        httpGet:: {
          local httpGet(mixin) = {httpGet+: mixin},
          httpHeaders(httpHeaders):: httpGet($.v1.hTTPGetAction.httpHeaders(httpHeaders)),
          path(path):: httpGet($.v1.hTTPGetAction.path(path)),
          port(port):: httpGet($.v1.hTTPGetAction.port(port)),
          host(host):: httpGet($.v1.hTTPGetAction.host(host)),
          scheme(scheme):: httpGet($.v1.hTTPGetAction.scheme(scheme)),
        },
      },
    },
    projectedVolumeSource:: {
      default(sources)::
      {
        sources: sources,
      },
      // Mode bits to use on created files by default. Must be a value between 0 and 0777. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // list of volume projections
      sources(sources):: if std.type(sources) == "array" then {sources+: sources} else {sources+: [sources]},
    },
    quobyteVolumeSource:: {
      default(registry, volume)::
      {
        registry: registry,
        volume: volume,
      },
      // Group to map volume access to Default is no group
      group(group):: {group: group},
      // ReadOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.
      readOnly(readOnly):: {readOnly: readOnly},
      // Registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes
      registry(registry):: {registry: registry},
      // User to map volume access to Defaults to serivceaccount user
      user(user):: {user: user},
      // Volume is a string that references an already created Quobyte volume by name.
      volume(volume):: {volume: volume},
    },
    rBDVolumeSource:: {
      default(monitors, image)::
      {
        secretRef: {},
        monitors: monitors,
        image: image,
      },
      // Filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
      fsType(fsType):: {fsType: fsType},
      // The rados image name. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      image(image):: {image: image},
      // Keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      keyring(keyring):: {keyring: keyring},
      // A collection of Ceph monitors. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      monitors(monitors):: if std.type(monitors) == "array" then {monitors+: monitors} else {monitors+: [monitors]},
      // The rados pool name. Default is rbd. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      pool(pool):: {pool: pool},
      // ReadOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      readOnly(readOnly):: {readOnly: readOnly},
      // SecretRef is name of the authentication secret for RBDUser. If provided overrides keyring. Default is nil. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      secretRef(secretRef):: {secretRef+: secretRef},
      // The rados user name. Default is admin. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md#how-to-use-it
      user(user):: {user: user},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    resourceFieldSelector:: {
      default(resource)::
      {
        resource: resource,
      },
      // Container name: required for volumes, optional for env vars
      containerName(containerName):: {containerName: containerName},
      // Specifies the output format of the exposed resources, defaults to "1"
      divisor(divisor):: {divisor: divisor},
      // Required: resource to select
      resource(resource):: {resource: resource},
    },
    resourceRequirements:: {
      default()::
      {
        requests: {},
        limits: {},
      },
      // Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
      limits(limits):: {limits+: limits},
      // Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
      requests(requests):: {requests+: requests},
    },
    sELinuxOptions:: {
      // Level is SELinux level label that applies to the container.
      level(level):: {level: level},
      // Role is a SELinux role label that applies to the container.
      role(role):: {role: role},
      // Type is a SELinux type label that applies to the container.
      type(type):: {type: type},
      // User is a SELinux user label that applies to the container.
      user(user):: {user: user},
    },
    scaleIOVolumeSource:: {
      default(gateway, system, secretRef)::
      {
        system: system,
        secretRef: secretRef,
        gateway: gateway,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // The host address of the ScaleIO API Gateway.
      gateway(gateway):: {gateway: gateway},
      // The name of the Protection Domain for the configured storage (defaults to "default").
      protectionDomain(protectionDomain):: {protectionDomain: protectionDomain},
      // Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.
      readOnly(readOnly):: {readOnly: readOnly},
      // SecretRef references to the secret for ScaleIO user and other sensitive information. If this is not provided, Login operation will fail.
      secretRef(secretRef):: {secretRef+: secretRef},
      // Flag to enable/disable SSL communication with Gateway, default false
      sslEnabled(sslEnabled):: {sslEnabled: sslEnabled},
      // Indicates whether the storage for a volume should be thick or thin (defaults to "thin").
      storageMode(storageMode):: {storageMode: storageMode},
      // The Storage Pool associated with the protection domain (defaults to "default").
      storagePool(storagePool):: {storagePool: storagePool},
      // The name of the storage system as configured in ScaleIO.
      system(system):: {system: system},
      // The name of a volume already created in the ScaleIO system that is associated with this volume source.
      volumeName(volumeName):: {volumeName: volumeName},
      mixin:: {
        secretRef:: {
          local secretRef(mixin) = {secretRef+: mixin},
          name(name):: secretRef($.v1.localObjectReference.name(name)),
        },
      },
    },
    secretEnvSource:: {
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the Secret must be defined
      optional(optional):: {optional: optional},
    },
    secretKeySelector:: {
      default(key)::
      {
        key: key,
      },
      // The key of the secret to select from.  Must be a valid secret key.
      key(key):: {key: key},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the Secret or it's key must be defined
      optional(optional):: {optional: optional},
    },
    secretProjection:: {
      default()::
      {
        items: [],
      },
      // If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // Specify whether the Secret or its key must be defined
      optional(optional):: {optional: optional},
    },
    secretVolumeSource:: {
      default()::
      {
        items: [],
      },
      // Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.
      defaultMode(defaultMode):: {defaultMode: defaultMode},
      // If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      // Specify whether the Secret or it's keys must be defined
      optional(optional):: {optional: optional},
      // Name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
      secretName(secretName):: {secretName: secretName},
    },
    securityContext:: {
      default()::
      {
        capabilities: {},
        seLinuxOptions: {},
        runAsUser: {},
      },
      // The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime.
      capabilities(capabilities):: {capabilities+: capabilities},
      // Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false.
      privileged(privileged):: {privileged: privileged},
      // Whether this container has a read-only root filesystem. Default is false.
      readOnlyRootFilesystem(readOnlyRootFilesystem):: {readOnlyRootFilesystem: readOnlyRootFilesystem},
      // Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      runAsNonRoot(runAsNonRoot):: {runAsNonRoot: runAsNonRoot},
      // The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      runAsUser(runAsUser):: {runAsUser+: runAsUser},
      // The SELinux context to be applied to the container. If unspecified, the container runtime will allocate a random SELinux context for each container.  May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
      seLinuxOptions(seLinuxOptions):: {seLinuxOptions+: seLinuxOptions},
      mixin:: {
        seLinuxOptions:: {
          local seLinuxOptions(mixin) = {seLinuxOptions+: mixin},
          type(type):: seLinuxOptions($.v1.sELinuxOptions.type(type)),
          level(level):: seLinuxOptions($.v1.sELinuxOptions.level(level)),
          user(user):: seLinuxOptions($.v1.sELinuxOptions.user(user)),
          role(role):: seLinuxOptions($.v1.sELinuxOptions.role(role)),
        },
        capabilities:: {
          local capabilities(mixin) = {capabilities+: mixin},
          add(add):: capabilities($.v1.capabilities.add(add)),
          drop(drop):: capabilities($.v1.capabilities.drop(drop)),
        },
      },
    },
    status:: {
      local kind = {kind: "Status"},
      default(name, namespace="default")::
        kind +
        apiVersion +
        defaultMetadata(name, namespace) +
      {
        details: {},
      },
      // Suggested HTTP return code for this status, 0 if not set.
      code(code):: {code: code},
      // Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.
      details(details):: {details+: details},
      // A human-readable description of the status of this operation.
      message(message):: {message: message},
      // A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.
      reason(reason):: {reason: reason},
      // Status of the operation. One of: "Success" or "Failure". More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#spec-and-status
      status(status):: {status: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
        },
        details:: {
          local details(mixin) = {details+: mixin},
          group(group):: details($.v1.statusDetails.group(group)),
          uid(uid):: details($.v1.statusDetails.uid(uid)),
          causes(causes):: details($.v1.statusDetails.causes(causes)),
          retryAfterSeconds(retryAfterSeconds):: details($.v1.statusDetails.retryAfterSeconds(retryAfterSeconds)),
          name(name):: details($.v1.statusDetails.name(name)),
        },
      },
    },
    statusCause:: {
      // The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.
      //
      // Examples:
      //   "name" - the field "name" on the current resource
      //   "items[0].name" - the field "name" on the first array entry in "items"
      field(field):: {field: field},
      // A human-readable description of the cause of the error.  This field may be presented as-is to a reader.
      message(message):: {message: message},
      // A machine-readable description of the cause of the error. If this value is empty there is no information available.
      reason(reason):: {reason: reason},
    },
    statusDetails:: {
      local kind = {kind: "StatusDetails"},
      default()::
        kind +
      {
        causes: [],
      },
      // The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
      causes(causes):: if std.type(causes) == "array" then {causes+: causes} else {causes+: [causes]},
      // The group attribute of the resource associated with the status StatusReason.
      group(group):: {group: group},
      // The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
      name(name):: {name: name},
      // If specified, the time in seconds before the operation should be retried.
      retryAfterSeconds(retryAfterSeconds):: {retryAfterSeconds: retryAfterSeconds},
      // UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
      uid(uid):: {uid: uid},
    },
    tCPSocketAction:: {
      default(port)::
      {
        port: port,
      },
      // Optional: Host name to connect to, defaults to the pod IP.
      host(host):: {host: host},
      // Number or name of the port to access on the container. Number must be in the range 1 to 65535. Name must be an IANA_SVC_NAME.
      port(port):: {port: port},
    },
    toleration:: {
      // Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
      effect(effect):: {effect: effect},
      // Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.
      key(key):: {key: key},
      // Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.
      operator(operator):: {operator: operator},
      // TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.
      tolerationSeconds(tolerationSeconds):: {tolerationSeconds: tolerationSeconds},
      // Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.
      value(value):: {value: value},
    },
    volume:: {
      default(name)::
      {
        hostPath: {},
        iscsi: {},
        vsphereVolume: {},
        emptyDir: {},
        quobyte: {},
        azureFile: {},
        secret: {},
        fc: {},
        flocker: {},
        portworxVolume: {},
        scaleIO: {},
        rbd: {},
        awsElasticBlockStore: {},
        name: name,
        glusterfs: {},
        downwardAPI: {},
        cinder: {},
        photonPersistentDisk: {},
        projected: {},
        cephfs: {},
        gitRepo: {},
        azureDisk: {},
        persistentVolumeClaim: {},
        flexVolume: {},
        nfs: {},
        configMap: {},
        gcePersistentDisk: {},
      },
      // AWSElasticBlockStore represents an AWS Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
      awsElasticBlockStore(awsElasticBlockStore):: {awsElasticBlockStore+: awsElasticBlockStore},
      // AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
      azureDisk(azureDisk):: {azureDisk+: azureDisk},
      // AzureFile represents an Azure File Service mount on the host and bind mount to the pod.
      azureFile(azureFile):: {azureFile+: azureFile},
      // CephFS represents a Ceph FS mount on the host that shares a pod's lifetime
      cephfs(cephfs):: {cephfs+: cephfs},
      // Cinder represents a cinder volume attached and mounted on kubelets host machine More info: https://releases.k8s.io/HEAD/examples/mysql-cinder-pd/README.md
      cinder(cinder):: {cinder+: cinder},
      // ConfigMap represents a configMap that should populate this volume
      configMap(configMap):: {configMap+: configMap},
      // DownwardAPI represents downward API about the pod that should populate this volume
      downwardAPI(downwardAPI):: {downwardAPI+: downwardAPI},
      // EmptyDir represents a temporary directory that shares a pod's lifetime. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
      emptyDir(emptyDir):: {emptyDir+: emptyDir},
      // FC represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
      fc(fc):: {fc+: fc},
      // FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin. This is an alpha feature and may change in future.
      flexVolume(flexVolume):: {flexVolume+: flexVolume},
      // Flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running
      flocker(flocker):: {flocker+: flocker},
      // GCEPersistentDisk represents a GCE Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
      gcePersistentDisk(gcePersistentDisk):: {gcePersistentDisk+: gcePersistentDisk},
      // GitRepo represents a git repository at a particular revision.
      gitRepo(gitRepo):: {gitRepo+: gitRepo},
      // Glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/glusterfs/README.md
      glusterfs(glusterfs):: {glusterfs+: glusterfs},
      // HostPath represents a pre-existing file or directory on the host machine that is directly exposed to the container. This is generally used for system agents or other privileged things that are allowed to see the host machine. Most containers will NOT need this. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
      hostPath(hostPath):: {hostPath+: hostPath},
      // ISCSI represents an ISCSI Disk resource that is attached to a kubelet's host machine and then exposed to the pod. More info: https://releases.k8s.io/HEAD/examples/volumes/iscsi/README.md
      iscsi(iscsi):: {iscsi+: iscsi},
      // Volume's name. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
      name(name):: {name: name},
      // NFS represents an NFS mount on the host that shares a pod's lifetime More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
      nfs(nfs):: {nfs+: nfs},
      // PersistentVolumeClaimVolumeSource represents a reference to a PersistentVolumeClaim in the same namespace. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
      persistentVolumeClaim(persistentVolumeClaim):: {persistentVolumeClaim+: persistentVolumeClaim},
      // PhotonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine
      photonPersistentDisk(photonPersistentDisk):: {photonPersistentDisk+: photonPersistentDisk},
      // PortworxVolume represents a portworx volume attached and mounted on kubelets host machine
      portworxVolume(portworxVolume):: {portworxVolume+: portworxVolume},
      // Items for all in one resources secrets, configmaps, and downward API
      projected(projected):: {projected+: projected},
      // Quobyte represents a Quobyte mount on the host that shares a pod's lifetime
      quobyte(quobyte):: {quobyte+: quobyte},
      // RBD represents a Rados Block Device mount on the host that shares a pod's lifetime. More info: https://releases.k8s.io/HEAD/examples/volumes/rbd/README.md
      rbd(rbd):: {rbd+: rbd},
      // ScaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
      scaleIO(scaleIO):: {scaleIO+: scaleIO},
      // Secret represents a secret that should populate this volume. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
      secret(secret):: {secret+: secret},
      // VsphereVolume represents a vSphere volume attached and mounted on kubelets host machine
      vsphereVolume(vsphereVolume):: {vsphereVolume+: vsphereVolume},
      mixin:: {
        scaleIO:: {
          local scaleIO(mixin) = {scaleIO+: mixin},
          system(system):: scaleIO($.v1.scaleIOVolumeSource.system(system)),
          secretRef(secretRef):: scaleIO($.v1.scaleIOVolumeSource.secretRef(secretRef)),
          sslEnabled(sslEnabled):: scaleIO($.v1.scaleIOVolumeSource.sslEnabled(sslEnabled)),
          gateway(gateway):: scaleIO($.v1.scaleIOVolumeSource.gateway(gateway)),
          protectionDomain(protectionDomain):: scaleIO($.v1.scaleIOVolumeSource.protectionDomain(protectionDomain)),
          volumeName(volumeName):: scaleIO($.v1.scaleIOVolumeSource.volumeName(volumeName)),
          readOnly(readOnly):: scaleIO($.v1.scaleIOVolumeSource.readOnly(readOnly)),
          fsType(fsType):: scaleIO($.v1.scaleIOVolumeSource.fsType(fsType)),
          storagePool(storagePool):: scaleIO($.v1.scaleIOVolumeSource.storagePool(storagePool)),
          storageMode(storageMode):: scaleIO($.v1.scaleIOVolumeSource.storageMode(storageMode)),
        },
        azureFile:: {
          local azureFile(mixin) = {azureFile+: mixin},
          readOnly(readOnly):: azureFile($.v1.azureFileVolumeSource.readOnly(readOnly)),
          secretName(secretName):: azureFile($.v1.azureFileVolumeSource.secretName(secretName)),
          shareName(shareName):: azureFile($.v1.azureFileVolumeSource.shareName(shareName)),
        },
        photonPersistentDisk:: {
          local photonPersistentDisk(mixin) = {photonPersistentDisk+: mixin},
          pdID(pdID):: photonPersistentDisk($.v1.photonPersistentDiskVolumeSource.pdID(pdID)),
          fsType(fsType):: photonPersistentDisk($.v1.photonPersistentDiskVolumeSource.fsType(fsType)),
        },
        iscsi:: {
          local iscsi(mixin) = {iscsi+: mixin},
          targetPortal(targetPortal):: iscsi($.v1.iSCSIVolumeSource.targetPortal(targetPortal)),
          fsType(fsType):: iscsi($.v1.iSCSIVolumeSource.fsType(fsType)),
          chapAuthDiscovery(chapAuthDiscovery):: iscsi($.v1.iSCSIVolumeSource.chapAuthDiscovery(chapAuthDiscovery)),
          chapAuthSession(chapAuthSession):: iscsi($.v1.iSCSIVolumeSource.chapAuthSession(chapAuthSession)),
          secretRef(secretRef):: iscsi($.v1.iSCSIVolumeSource.secretRef(secretRef)),
          iqn(iqn):: iscsi($.v1.iSCSIVolumeSource.iqn(iqn)),
          iscsiInterface(iscsiInterface):: iscsi($.v1.iSCSIVolumeSource.iscsiInterface(iscsiInterface)),
          readOnly(readOnly):: iscsi($.v1.iSCSIVolumeSource.readOnly(readOnly)),
          portals(portals):: iscsi($.v1.iSCSIVolumeSource.portals(portals)),
          lun(lun):: iscsi($.v1.iSCSIVolumeSource.lun(lun)),
        },
        rbd:: {
          local rbd(mixin) = {rbd+: mixin},
          image(image):: rbd($.v1.rBDVolumeSource.image(image)),
          fsType(fsType):: rbd($.v1.rBDVolumeSource.fsType(fsType)),
          pool(pool):: rbd($.v1.rBDVolumeSource.pool(pool)),
          user(user):: rbd($.v1.rBDVolumeSource.user(user)),
          keyring(keyring):: rbd($.v1.rBDVolumeSource.keyring(keyring)),
          secretRef(secretRef):: rbd($.v1.rBDVolumeSource.secretRef(secretRef)),
          readOnly(readOnly):: rbd($.v1.rBDVolumeSource.readOnly(readOnly)),
          monitors(monitors):: rbd($.v1.rBDVolumeSource.monitors(monitors)),
        },
        persistentVolumeClaim:: {
          local persistentVolumeClaim(mixin) = {persistentVolumeClaim+: mixin},
          claimName(claimName):: persistentVolumeClaim($.v1.persistentVolumeClaimVolumeSource.claimName(claimName)),
          readOnly(readOnly):: persistentVolumeClaim($.v1.persistentVolumeClaimVolumeSource.readOnly(readOnly)),
        },
        fc:: {
          local fc(mixin) = {fc+: mixin},
          lun(lun):: fc($.v1.fCVolumeSource.lun(lun)),
          fsType(fsType):: fc($.v1.fCVolumeSource.fsType(fsType)),
          readOnly(readOnly):: fc($.v1.fCVolumeSource.readOnly(readOnly)),
          targetWWNs(targetWWNs):: fc($.v1.fCVolumeSource.targetWWNs(targetWWNs)),
        },
        downwardAPI:: {
          local downwardAPI(mixin) = {downwardAPI+: mixin},
          items(items):: downwardAPI($.v1.downwardAPIVolumeSource.items(items)),
          defaultMode(defaultMode):: downwardAPI($.v1.downwardAPIVolumeSource.defaultMode(defaultMode)),
        },
        cephfs:: {
          local cephfs(mixin) = {cephfs+: mixin},
          readOnly(readOnly):: cephfs($.v1.cephFSVolumeSource.readOnly(readOnly)),
          monitors(monitors):: cephfs($.v1.cephFSVolumeSource.monitors(monitors)),
          path(path):: cephfs($.v1.cephFSVolumeSource.path(path)),
          user(user):: cephfs($.v1.cephFSVolumeSource.user(user)),
          secretFile(secretFile):: cephfs($.v1.cephFSVolumeSource.secretFile(secretFile)),
          secretRef(secretRef):: cephfs($.v1.cephFSVolumeSource.secretRef(secretRef)),
        },
        vsphereVolume:: {
          local vsphereVolume(mixin) = {vsphereVolume+: mixin},
          volumePath(volumePath):: vsphereVolume($.v1.vsphereVirtualDiskVolumeSource.volumePath(volumePath)),
          fsType(fsType):: vsphereVolume($.v1.vsphereVirtualDiskVolumeSource.fsType(fsType)),
        },
        projected:: {
          local projected(mixin) = {projected+: mixin},
          defaultMode(defaultMode):: projected($.v1.projectedVolumeSource.defaultMode(defaultMode)),
          sources(sources):: projected($.v1.projectedVolumeSource.sources(sources)),
        },
        cinder:: {
          local cinder(mixin) = {cinder+: mixin},
          readOnly(readOnly):: cinder($.v1.cinderVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: cinder($.v1.cinderVolumeSource.volumeID(volumeID)),
          fsType(fsType):: cinder($.v1.cinderVolumeSource.fsType(fsType)),
        },
        azureDisk:: {
          local azureDisk(mixin) = {azureDisk+: mixin},
          diskName(diskName):: azureDisk($.v1.azureDiskVolumeSource.diskName(diskName)),
          diskURI(diskURI):: azureDisk($.v1.azureDiskVolumeSource.diskURI(diskURI)),
          cachingMode(cachingMode):: azureDisk($.v1.azureDiskVolumeSource.cachingMode(cachingMode)),
          fsType(fsType):: azureDisk($.v1.azureDiskVolumeSource.fsType(fsType)),
          readOnly(readOnly):: azureDisk($.v1.azureDiskVolumeSource.readOnly(readOnly)),
        },
        secret:: {
          local secret(mixin) = {secret+: mixin},
          secretName(secretName):: secret($.v1.secretVolumeSource.secretName(secretName)),
          items(items):: secret($.v1.secretVolumeSource.items(items)),
          defaultMode(defaultMode):: secret($.v1.secretVolumeSource.defaultMode(defaultMode)),
          optional(optional):: secret($.v1.secretVolumeSource.optional(optional)),
        },
        gitRepo:: {
          local gitRepo(mixin) = {gitRepo+: mixin},
          directory(directory):: gitRepo($.v1.gitRepoVolumeSource.directory(directory)),
          repository(repository):: gitRepo($.v1.gitRepoVolumeSource.repository(repository)),
          revision(revision):: gitRepo($.v1.gitRepoVolumeSource.revision(revision)),
        },
        quobyte:: {
          local quobyte(mixin) = {quobyte+: mixin},
          group(group):: quobyte($.v1.quobyteVolumeSource.group(group)),
          registry(registry):: quobyte($.v1.quobyteVolumeSource.registry(registry)),
          volume(volume):: quobyte($.v1.quobyteVolumeSource.volume(volume)),
          readOnly(readOnly):: quobyte($.v1.quobyteVolumeSource.readOnly(readOnly)),
          user(user):: quobyte($.v1.quobyteVolumeSource.user(user)),
        },
        nfs:: {
          local nfs(mixin) = {nfs+: mixin},
          server(server):: nfs($.v1.nFSVolumeSource.server(server)),
          path(path):: nfs($.v1.nFSVolumeSource.path(path)),
          readOnly(readOnly):: nfs($.v1.nFSVolumeSource.readOnly(readOnly)),
        },
        awsElasticBlockStore:: {
          local awsElasticBlockStore(mixin) = {awsElasticBlockStore+: mixin},
          fsType(fsType):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.fsType(fsType)),
          partition(partition):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.partition(partition)),
          readOnly(readOnly):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.readOnly(readOnly)),
          volumeID(volumeID):: awsElasticBlockStore($.v1.aWSElasticBlockStoreVolumeSource.volumeID(volumeID)),
        },
        emptyDir:: {
          local emptyDir(mixin) = {emptyDir+: mixin},
          medium(medium):: emptyDir($.v1.emptyDirVolumeSource.medium(medium)),
        },
        hostPath:: {
          local hostPath(mixin) = {hostPath+: mixin},
          path(path):: hostPath($.v1.hostPathVolumeSource.path(path)),
        },
        configMap:: {
          local configMap(mixin) = {configMap+: mixin},
          items(items):: configMap($.v1.configMapVolumeSource.items(items)),
          defaultMode(defaultMode):: configMap($.v1.configMapVolumeSource.defaultMode(defaultMode)),
          optional(optional):: configMap($.v1.configMapVolumeSource.optional(optional)),
          name(name):: configMap($.v1.configMapVolumeSource.name(name)),
        },
        flexVolume:: {
          local flexVolume(mixin) = {flexVolume+: mixin},
          secretRef(secretRef):: flexVolume($.v1.flexVolumeSource.secretRef(secretRef)),
          readOnly(readOnly):: flexVolume($.v1.flexVolumeSource.readOnly(readOnly)),
          options(options):: flexVolume($.v1.flexVolumeSource.options(options)),
          driver(driver):: flexVolume($.v1.flexVolumeSource.driver(driver)),
          fsType(fsType):: flexVolume($.v1.flexVolumeSource.fsType(fsType)),
        },
        glusterfs:: {
          local glusterfs(mixin) = {glusterfs+: mixin},
          path(path):: glusterfs($.v1.glusterfsVolumeSource.path(path)),
          readOnly(readOnly):: glusterfs($.v1.glusterfsVolumeSource.readOnly(readOnly)),
          endpoints(endpoints):: glusterfs($.v1.glusterfsVolumeSource.endpoints(endpoints)),
        },
        portworxVolume:: {
          local portworxVolume(mixin) = {portworxVolume+: mixin},
          volumeID(volumeID):: portworxVolume($.v1.portworxVolumeSource.volumeID(volumeID)),
          fsType(fsType):: portworxVolume($.v1.portworxVolumeSource.fsType(fsType)),
          readOnly(readOnly):: portworxVolume($.v1.portworxVolumeSource.readOnly(readOnly)),
        },
        gcePersistentDisk:: {
          local gcePersistentDisk(mixin) = {gcePersistentDisk+: mixin},
          partition(partition):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.partition(partition)),
          readOnly(readOnly):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.readOnly(readOnly)),
          pdName(pdName):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.pdName(pdName)),
          fsType(fsType):: gcePersistentDisk($.v1.gCEPersistentDiskVolumeSource.fsType(fsType)),
        },
        flocker:: {
          local flocker(mixin) = {flocker+: mixin},
          datasetUUID(datasetUUID):: flocker($.v1.flockerVolumeSource.datasetUUID(datasetUUID)),
          datasetName(datasetName):: flocker($.v1.flockerVolumeSource.datasetName(datasetName)),
        },
      },
    },
    volumeMount:: {
      default(name, mountPath)::
      {
        name: name,
        mountPath: mountPath,
      },
      // Path within the container at which the volume should be mounted.  Must not contain ':'.
      mountPath(mountPath):: {mountPath: mountPath},
      // This must match the Name of a Volume.
      name(name):: {name: name},
      // Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.
      readOnly(readOnly):: {readOnly: readOnly},
      // Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root).
      subPath(subPath):: {subPath: subPath},
    },
    volumeProjection:: {
      default()::
      {
        configMap: {},
        secret: {},
        downwardAPI: {},
      },
      // information about the configMap data to project
      configMap(configMap):: {configMap+: configMap},
      // information about the downwardAPI data to project
      downwardAPI(downwardAPI):: {downwardAPI+: downwardAPI},
      // information about the secret data to project
      secret(secret):: {secret+: secret},
      mixin:: {
        secret:: {
          local secret(mixin) = {secret+: mixin},
          name(name):: secret($.v1.secretProjection.name(name)),
          items(items):: secret($.v1.secretProjection.items(items)),
          optional(optional):: secret($.v1.secretProjection.optional(optional)),
        },
        downwardAPI:: {
          local downwardAPI(mixin) = {downwardAPI+: mixin},
          items(items):: downwardAPI($.v1.downwardAPIProjection.items(items)),
        },
        configMap:: {
          local configMap(mixin) = {configMap+: mixin},
          name(name):: configMap($.v1.configMapProjection.name(name)),
          items(items):: configMap($.v1.configMapProjection.items(items)),
          optional(optional):: configMap($.v1.configMapProjection.optional(optional)),
        },
      },
    },
    vsphereVirtualDiskVolumeSource:: {
      default(volumePath)::
      {
        volumePath: volumePath,
      },
      // Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
      fsType(fsType):: {fsType: fsType},
      // Path that identifies vSphere volume vmdk
      volumePath(volumePath):: {volumePath: volumePath},
    },
    watchEvent:: {
      default(type, object)::
      {
        type: type,
        object: object,
      },
      //
      object(object):: {object: object},
      //
      type(type):: {type: type},
    },
    weightedPodAffinityTerm:: {
      default(weight, podAffinityTerm)::
      {
        podAffinityTerm: podAffinityTerm,
        weight: weight,
      },
      // Required. A pod affinity term, associated with the corresponding weight.
      podAffinityTerm(podAffinityTerm):: {podAffinityTerm+: podAffinityTerm},
      // weight associated with matching the corresponding podAffinityTerm, in the range 1-100.
      weight(weight):: {weight: weight},
      mixin:: {
        podAffinityTerm:: {
          local podAffinityTerm(mixin) = {podAffinityTerm+: mixin},
          labelSelector(labelSelector):: podAffinityTerm($.v1.podAffinityTerm.labelSelector(labelSelector)),
          namespaces(namespaces):: podAffinityTerm($.v1.podAffinityTerm.namespaces(namespaces)),
          topologyKey(topologyKey):: podAffinityTerm($.v1.podAffinityTerm.topologyKey(topologyKey)),
        },
      },
    },
  },
  v1beta1:: {
    deployment:: {
      local kind = {kind: "Deployment"},
      default(name, namespace="default")::
        defaultMetadata(name, namespace) +
        kind +
        apiVersion +
      {
        spec: {},
        status: {},
      },
      // Specification of the desired behavior of the Deployment.
      spec(spec):: {spec+: spec},
      // Most recently observed status of the Deployment.
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          name(name):: metadata($.v1.objectMeta.name(name)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          availableReplicas(availableReplicas):: status($.v1beta1.deploymentStatus.availableReplicas(availableReplicas)),
          unavailableReplicas(unavailableReplicas):: status($.v1beta1.deploymentStatus.unavailableReplicas(unavailableReplicas)),
          conditions(conditions):: status($.v1beta1.deploymentStatus.conditions(conditions)),
          observedGeneration(observedGeneration):: status($.v1beta1.deploymentStatus.observedGeneration(observedGeneration)),
          replicas(replicas):: status($.v1beta1.deploymentStatus.replicas(replicas)),
          updatedReplicas(updatedReplicas):: status($.v1beta1.deploymentStatus.updatedReplicas(updatedReplicas)),
          readyReplicas(readyReplicas):: status($.v1beta1.deploymentStatus.readyReplicas(readyReplicas)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          strategy(strategy):: spec($.v1beta1.deploymentSpec.strategy(strategy)),
          template(template):: spec($.v1beta1.deploymentSpec.template(template)),
          minReadySeconds(minReadySeconds):: spec($.v1beta1.deploymentSpec.minReadySeconds(minReadySeconds)),
          selector(selector):: spec($.v1beta1.deploymentSpec.selector(selector)),
          revisionHistoryLimit(revisionHistoryLimit):: spec($.v1beta1.deploymentSpec.revisionHistoryLimit(revisionHistoryLimit)),
          rollbackTo(rollbackTo):: spec($.v1beta1.deploymentSpec.rollbackTo(rollbackTo)),
          replicas(replicas):: spec($.v1beta1.deploymentSpec.replicas(replicas)),
          progressDeadlineSeconds(progressDeadlineSeconds):: spec($.v1beta1.deploymentSpec.progressDeadlineSeconds(progressDeadlineSeconds)),
          paused(paused):: spec($.v1beta1.deploymentSpec.paused(paused)),
        },
      },
    },
    deploymentCondition:: {
      default(type, status)::
      {
        status: status,
        type: type,
      },
      // Last time the condition transitioned from one status to another.
      lastTransitionTime(lastTransitionTime):: {lastTransitionTime: lastTransitionTime},
      // The last time this condition was updated.
      lastUpdateTime(lastUpdateTime):: {lastUpdateTime: lastUpdateTime},
      // A human readable message indicating details about the transition.
      message(message):: {message: message},
      // The reason for the condition's last transition.
      reason(reason):: {reason: reason},
      // Status of the condition, one of True, False, Unknown.
      status(status):: {status: status},
      // Type of deployment condition.
      type(type):: {type: type},
    },
    deploymentList:: {
      local kind = {kind: "DeploymentList"},
      default(name, items, namespace="default")::
        apiVersion +
        defaultMetadata(name, namespace) +
        kind +
      {
        items: items,
      },
      // Items is the list of Deployments.
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
        },
      },
    },
    deploymentRollback:: {
      local kind = {kind: "DeploymentRollback"},
      default(name, rollbackTo)::
        kind +
        apiVersion +
      {
        updatedAnnotations: {},
        rollbackTo: rollbackTo,
        name: name,
      },
      // Required: This must match the Name of a deployment.
      name(name):: {name: name},
      // The config of this deployment rollback.
      rollbackTo(rollbackTo):: {rollbackTo+: rollbackTo},
      // The annotations to be updated to a deployment
      updatedAnnotations(updatedAnnotations):: {updatedAnnotations+: updatedAnnotations},
      mixin:: {
        rollbackTo:: {
          local rollbackTo(mixin) = {rollbackTo+: mixin},
          revision(revision):: rollbackTo($.v1beta1.rollbackConfig.revision(revision)),
        },
      },
    },
    deploymentSpec:: {
      default(template)::
      {
        template: template,
        strategy: {},
        selector: {},
        rollbackTo: {},
      },
      // Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
      minReadySeconds(minReadySeconds):: {minReadySeconds: minReadySeconds},
      // Indicates that the deployment is paused.
      paused(paused):: {paused: paused},
      // The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Once autoRollback is implemented, the deployment controller will automatically rollback failed deployments. Note that progress will not be estimated during the time a deployment is paused. Defaults to 600s.
      progressDeadlineSeconds(progressDeadlineSeconds):: {progressDeadlineSeconds: progressDeadlineSeconds},
      // Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
      replicas(replicas):: {replicas: replicas},
      // The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 2.
      revisionHistoryLimit(revisionHistoryLimit):: {revisionHistoryLimit: revisionHistoryLimit},
      // The config this deployment is rolling back to. Will be cleared after rollback is done.
      rollbackTo(rollbackTo):: {rollbackTo+: rollbackTo},
      // Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment.
      selector(selector):: {selector+: selector},
      // The deployment strategy to use to replace existing pods with new ones.
      strategy(strategy):: {strategy+: strategy},
      // Template describes the pods that will be created.
      template(template):: {template+: template},
      mixin:: {
        strategy:: {
          local strategy(mixin) = {strategy+: mixin},
          type(type):: strategy($.v1beta1.deploymentStrategy.type(type)),
          rollingUpdate(rollingUpdate):: strategy($.v1beta1.deploymentStrategy.rollingUpdate(rollingUpdate)),
        },
        template:: {
          local template(mixin) = {template+: mixin},
          spec(spec):: template($.v1.podTemplateSpec.spec(spec)),
        },
        selector:: {
          local selector(mixin) = {selector+: mixin},
          matchLabels(matchLabels):: selector($.v1.labelSelector.matchLabels(matchLabels)),
          matchExpressions(matchExpressions):: selector($.v1.labelSelector.matchExpressions(matchExpressions)),
        },
        rollbackTo:: {
          local rollbackTo(mixin) = {rollbackTo+: mixin},
          revision(revision):: rollbackTo($.v1beta1.rollbackConfig.revision(revision)),
        },
      },
    },
    deploymentStatus:: {
      default()::
      {
        conditions: [],
      },
      // Total number of available pods (ready for at least minReadySeconds) targeted by this deployment.
      availableReplicas(availableReplicas):: {availableReplicas: availableReplicas},
      // Represents the latest available observations of a deployment's current state.
      conditions(conditions):: if std.type(conditions) == "array" then {conditions+: conditions} else {conditions+: [conditions]},
      // The generation observed by the deployment controller.
      observedGeneration(observedGeneration):: {observedGeneration: observedGeneration},
      // Total number of ready pods targeted by this deployment.
      readyReplicas(readyReplicas):: {readyReplicas: readyReplicas},
      // Total number of non-terminated pods targeted by this deployment (their labels match the selector).
      replicas(replicas):: {replicas: replicas},
      // Total number of unavailable pods targeted by this deployment.
      unavailableReplicas(unavailableReplicas):: {unavailableReplicas: unavailableReplicas},
      // Total number of non-terminated pods targeted by this deployment that have the desired template spec.
      updatedReplicas(updatedReplicas):: {updatedReplicas: updatedReplicas},
    },
    deploymentStrategy:: {
      default()::
      {
        rollingUpdate: {},
      },
      // Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
      rollingUpdate(rollingUpdate):: {rollingUpdate+: rollingUpdate},
      // Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
      type(type):: {type: type},
      mixin:: {
        rollingUpdate:: {
          local rollingUpdate(mixin) = {rollingUpdate+: mixin},
          maxUnavailable(maxUnavailable):: rollingUpdate($.v1beta1.rollingUpdateDeployment.maxUnavailable(maxUnavailable)),
          maxSurge(maxSurge):: rollingUpdate($.v1beta1.rollingUpdateDeployment.maxSurge(maxSurge)),
        },
      },
    },
    rollbackConfig:: {
      // The revision to rollback to. If set to 0, rollbck to the last revision.
      revision(revision):: {revision: revision},
    },
    rollingUpdateDeployment:: {
      // The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. Defaults to 25%. Example: when this is set to 30%, the new RC can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new RC can be scaled up further, ensuring that total number of pods running at any time during the update is atmost 130% of desired pods.
      maxSurge(maxSurge):: {maxSurge: maxSurge},
      // The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. Defaults to 25%. Example: when this is set to 30%, the old RC can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old RC can be scaled down further, followed by scaling up the new RC, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
      maxUnavailable(maxUnavailable):: {maxUnavailable: maxUnavailable},
    },
    scale:: {
      local kind = {kind: "Scale"},
      default(name, namespace="default")::
        kind +
        apiVersion +
        defaultMetadata(name, namespace) +
      {
        spec: {},
        status: {},
      },
      // defines the behavior of the scale. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#spec-and-status.
      spec(spec):: {spec+: spec},
      // current status of the scale. More info: http://releases.k8s.io/HEAD/docs/devel/api-conventions.md#spec-and-status. Read-only.
      status(status):: {status+: status},
      mixin:: {
        spec:: {
          local spec(mixin) = {spec+: mixin},
          replicas(replicas):: spec($.v1beta1.scaleSpec.replicas(replicas)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          replicas(replicas):: status($.v1beta1.scaleStatus.replicas(replicas)),
          selector(selector):: status($.v1beta1.scaleStatus.selector(selector)),
          targetSelector(targetSelector):: status($.v1beta1.scaleStatus.targetSelector(targetSelector)),
        },
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          name(name):: metadata($.v1.objectMeta.name(name)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
        },
      },
    },
    scaleSpec:: {
      // desired number of instances for the scaled object.
      replicas(replicas):: {replicas: replicas},
    },
    scaleStatus:: {
      default(replicas)::
      {
        selector: {},
        replicas: replicas,
      },
      // actual number of observed instances of the scaled object.
      replicas(replicas):: {replicas: replicas},
      // label query over pods that should match the replicas count. More info: http://kubernetes.io/docs/user-guide/labels#label-selectors
      selector(selector):: {selector+: selector},
      // label selector for pods that should match the replicas count. This is a serializated version of both map-based and more expressive set-based selectors. This is done to avoid introspection in the clients. The string will be in the same format as the query-param syntax. If the target type only supports map-based selectors, both this field and map-based selector field are populated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
      targetSelector(targetSelector):: {targetSelector: targetSelector},
    },
    statefulSet:: {
      local kind = {kind: "StatefulSet"},
      default(name, namespace="default")::
        defaultMetadata(name, namespace) +
        kind +
        apiVersion +
      {
        spec: {},
        status: {},
      },
      // Spec defines the desired identities of pods in this set.
      spec(spec):: {spec+: spec},
      // Status is the current status of Pods in this StatefulSet. This data may be out of date by some window of time.
      status(status):: {status+: status},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          name(name):: metadata($.v1.objectMeta.name(name)),
          resourceVersion(resourceVersion):: metadata($.v1.objectMeta.resourceVersion(resourceVersion)),
          selfLink(selfLink):: metadata($.v1.objectMeta.selfLink(selfLink)),
          namespace(namespace):: metadata($.v1.objectMeta.namespace(namespace)),
          initializers(initializers):: metadata($.v1.objectMeta.initializers(initializers)),
          labels(labels):: metadata($.v1.objectMeta.labels(labels)),
          deletionTimestamp(deletionTimestamp):: metadata($.v1.objectMeta.deletionTimestamp(deletionTimestamp)),
          deletionGracePeriodSeconds(deletionGracePeriodSeconds):: metadata($.v1.objectMeta.deletionGracePeriodSeconds(deletionGracePeriodSeconds)),
          creationTimestamp(creationTimestamp):: metadata($.v1.objectMeta.creationTimestamp(creationTimestamp)),
          clusterName(clusterName):: metadata($.v1.objectMeta.clusterName(clusterName)),
          uid(uid):: metadata($.v1.objectMeta.uid(uid)),
          finalizers(finalizers):: metadata($.v1.objectMeta.finalizers(finalizers)),
          annotations(annotations):: metadata($.v1.objectMeta.annotations(annotations)),
          generation(generation):: metadata($.v1.objectMeta.generation(generation)),
          generateName(generateName):: metadata($.v1.objectMeta.generateName(generateName)),
          ownerReferences(ownerReferences):: metadata($.v1.objectMeta.ownerReferences(ownerReferences)),
        },
        spec:: {
          local spec(mixin) = {spec+: mixin},
          replicas(replicas):: spec($.v1beta1.statefulSetSpec.replicas(replicas)),
          selector(selector):: spec($.v1beta1.statefulSetSpec.selector(selector)),
          template(template):: spec($.v1beta1.statefulSetSpec.template(template)),
          volumeClaimTemplates(volumeClaimTemplates):: spec($.v1beta1.statefulSetSpec.volumeClaimTemplates(volumeClaimTemplates)),
          serviceName(serviceName):: spec($.v1beta1.statefulSetSpec.serviceName(serviceName)),
        },
        status:: {
          local status(mixin) = {status+: mixin},
          observedGeneration(observedGeneration):: status($.v1beta1.statefulSetStatus.observedGeneration(observedGeneration)),
          replicas(replicas):: status($.v1beta1.statefulSetStatus.replicas(replicas)),
        },
      },
    },
    statefulSetList:: {
      local kind = {kind: "StatefulSetList"},
      default(name, items, namespace="default")::
        kind +
        apiVersion +
        defaultMetadata(name, namespace) +
      {
        items: items,
      },
      //
      items(items):: if std.type(items) == "array" then {items+: items} else {items+: [items]},
      mixin:: {
        metadata:: {
          local metadata(mixin) = {metadata+: mixin},
          selfLink(selfLink):: metadata($.v1.listMeta.selfLink(selfLink)),
          resourceVersion(resourceVersion):: metadata($.v1.listMeta.resourceVersion(resourceVersion)),
        },
      },
    },
    statefulSetSpec:: {
      default(template, serviceName)::
      {
        selector: {},
        template: template,
        volumeClaimTemplates: [],
        serviceName: serviceName,
      },
      // Replicas is the desired number of replicas of the given Template. These are replicas in the sense that they are instantiations of the same Template, but individual replicas also have a consistent identity. If unspecified, defaults to 1.
      replicas(replicas):: {replicas: replicas},
      // Selector is a label query over pods that should match the replica count. If empty, defaulted to labels on the pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
      selector(selector):: {selector+: selector},
      // ServiceName is the name of the service that governs this StatefulSet. This service must exist before the StatefulSet, and is responsible for the network identity of the set. Pods get DNS/hostnames that follow the pattern: pod-specific-string.serviceName.default.svc.cluster.local where "pod-specific-string" is managed by the StatefulSet controller.
      serviceName(serviceName):: {serviceName: serviceName},
      // Template is the object that describes the pod that will be created if insufficient replicas are detected. Each pod stamped out by the StatefulSet will fulfill this Template, but have a unique identity from the rest of the StatefulSet.
      template(template):: {template+: template},
      // VolumeClaimTemplates is a list of claims that pods are allowed to reference. The StatefulSet controller is responsible for mapping network identities to claims in a way that maintains the identity of a pod. Every claim in this list must have at least one matching (by name) volumeMount in one container in the template. A claim in this list takes precedence over any volumes in the template, with the same name.
      volumeClaimTemplates(volumeClaimTemplates):: if std.type(volumeClaimTemplates) == "array" then {volumeClaimTemplates+: volumeClaimTemplates} else {volumeClaimTemplates+: [volumeClaimTemplates]},
      mixin:: {
        selector:: {
          local selector(mixin) = {selector+: mixin},
          matchExpressions(matchExpressions):: selector($.v1.labelSelector.matchExpressions(matchExpressions)),
          matchLabels(matchLabels):: selector($.v1.labelSelector.matchLabels(matchLabels)),
        },
        template:: {
          local template(mixin) = {template+: mixin},
          spec(spec):: template($.v1.podTemplateSpec.spec(spec)),
        },
      },
    },
    statefulSetStatus:: {
      default(replicas)::
      {
        replicas: replicas,
      },
      // most recent generation observed by this StatefulSet.
      observedGeneration(observedGeneration):: {observedGeneration: observedGeneration},
      // Replicas is the number of actual replicas.
      replicas(replicas):: {replicas: replicas},
    },
  },
}
`;

export const kubeFile = `local core = import "core.v1beta1.libsonnet";

core + {
  v1+:: {
    container+:: {
      default(name, image)::
        super.default(name) +
        super.image(image),
      helpers:: {
        namedPort(name, port)::
          local portObj =
            core.v1.containerPort.name(name) +
            core.v1.containerPort.containerPort(port);
          core.v1.container.ports(portObj),
      }
    },
  },
  v1beta1+:: {
    deployment+:: {
      default(name, containers, namespace="default")::
        super.default(name, namespace) + {
          spec+: {
            template: {spec: core.v1.podSpec.default(containers)},
          },
        },
      mixin+:: {
        spec:: {
          local spec(mixin) = {
            spec+: {
              template+: {
                spec+: mixin,
              },
            },
          },
          serviceAccountName(serviceAccountName):: spec($.v1.podSpec.serviceAccountName(serviceAccountName)),
          restartPolicy(restartPolicy):: spec($.v1.podSpec.restartPolicy(restartPolicy)),
          automountServiceAccountToken(automountServiceAccountToken):: spec($.v1.podSpec.automountServiceAccountToken(automountServiceAccountToken)),
          activeDeadlineSeconds(activeDeadlineSeconds):: spec($.v1.podSpec.activeDeadlineSeconds(activeDeadlineSeconds)),
          affinity(affinity):: spec($.v1.podSpec.affinity(affinity)),
          serviceAccount(serviceAccount):: spec($.v1.podSpec.serviceAccount(serviceAccount)),
          imagePullSecrets(imagePullSecrets):: spec($.v1.podSpec.imagePullSecrets(imagePullSecrets)),
          hostNetwork(hostNetwork):: spec($.v1.podSpec.hostNetwork(hostNetwork)),
          dnsPolicy(dnsPolicy):: spec($.v1.podSpec.dnsPolicy(dnsPolicy)),
          tolerations(tolerations):: spec($.v1.podSpec.tolerations(tolerations)),
          hostIPC(hostIPC):: spec($.v1.podSpec.hostIPC(hostIPC)),
          initContainers(initContainers):: spec($.v1.podSpec.initContainers(initContainers)),
          schedulerName(schedulerName):: spec($.v1.podSpec.schedulerName(schedulerName)),
          hostPID(hostPID):: spec($.v1.podSpec.hostPID(hostPID)),
          volumes(volumes):: spec($.v1.podSpec.volumes(volumes)),
          nodeName(nodeName):: spec($.v1.podSpec.nodeName(nodeName)),
          securityContext(securityContext):: spec($.v1.podSpec.securityContext(securityContext)),
          nodeSelector(nodeSelector):: spec($.v1.podSpec.nodeSelector(nodeSelector)),
          hostname(hostname):: spec($.v1.podSpec.hostname(hostname)),
          hostMappings(hostMappings):: spec($.v1.podSpec.hostMappings(hostMappings)),
          terminationGracePeriodSeconds(terminationGracePeriodSeconds):: spec($.v1.podSpec.terminationGracePeriodSeconds(terminationGracePeriodSeconds)),
          containers(containers):: spec($.v1.podSpec.containers(containers)),
          subdomain(subdomain):: spec($.v1.podSpec.subdomain(subdomain)),
        },
      },
    },
  },
}
`;
